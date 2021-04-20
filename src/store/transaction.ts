import { VuexModule, Module, Mutation, Action } from "vuex-class-modules";
import store from "@/store";
import { MessageBlock, TransactionBlock, TransactionInfo } from "@/models/transaction";
import { terminalWSModule } from "./terminal-ws";
import { walletModule } from "./wallet";
import { cartModule } from "./cart";
import { PaymentStatus } from "../models/payment-status";
import { Nano } from "@/plugins/nano";
import { Item } from "@/models/item";
import { http } from "@/plugins/http";

@Module
class TransactionModule extends VuexModule {

  transactionWs: WebSocket | any = undefined;
  status: PaymentStatus = PaymentStatus.NONE;

  get transactionIsAccepted(): boolean {
    return this.status === PaymentStatus.ACCEPTED;
  }

  get transactionIsRejected(): boolean {
    return this.status === PaymentStatus.REJECTED;
  }

  @Mutation
  setTransactionWs(ws: WebSocket) {
    this.transactionWs = ws;
  }

  @Mutation
  setStatus(status: PaymentStatus) {
    this.status = status;
  }

  @Action
  cancelCurrentRequest() {
    if (this.transactionWs) {
      this.transactionWs?.close();
    }
    this.setStatus(PaymentStatus.NONE);
  }

  @Action
  subscribeWebsocket(transaction: TransactionInfo) {
    if (this.status === PaymentStatus.PENDING) return;
    this.setStatus(PaymentStatus.PENDING);

    const ws = new WebSocket(process.env.VUE_APP_WSS_URL!);
    ws.onopen = () => {
      ws.send(JSON.stringify({
        action: "subscribe",
        topic: "confirmation",
        options: {
          accounts: [
            transaction.account
          ]
        }
      }));
    };

    ws.onmessage = async (e: any) => {
      if (this.status === PaymentStatus.NONE) {
        ws.close();
        return;
      }

      const eData = JSON.parse(e.data);
      if (eData.ack) return;
      const messageBlock = eData.message as MessageBlock;
      const transactionBlock = messageBlock.block as TransactionBlock;
      if (transactionBlock.subtype === "send") {
        if (messageBlock.amount !== transaction.price) {
          terminalWSModule.sendToTerminal("transaction", { accepted: false });

          this.setStatus(PaymentStatus.REJECTED);

          setTimeout(() => {
            this.setStatus(PaymentStatus.NONE);
            cartModule.sendToTerminal(false);
          }, 2000);

          const receiveBlock = await Nano.createBlockReceive(messageBlock, walletModule.privateKey, walletModule.address);
          await Nano.processBlock(receiveBlock, false);
          const sendBlock = await Nano.createBlockSend(messageBlock.amount, walletModule.privateKey, walletModule.address, messageBlock.account);
          await Nano.processBlock(sendBlock, true);
          return;
        }

        terminalWSModule.sendToTerminal("transaction", { accepted: true });

        const items = [...cartModule.items];
        const totalAmount = cartModule.totalAmount.toString();
        const totalNano = cartModule.totalNanoAmount.toFixed(3);
        this.saveTransaction(items, totalAmount, totalNano, messageBlock.hash, messageBlock.account, walletModule.address);

        this.setStatus(PaymentStatus.ACCEPTED);
        setTimeout(() => {
          cartModule.clearCart();
          this.setStatus(PaymentStatus.NONE);
        }, 2000);

        const receiveBlock = await Nano.createBlockReceive(messageBlock, walletModule.privateKey, walletModule.address);
        Nano.processBlock(receiveBlock, false);
        ws.close();
      }
    }

    this.setTransactionWs(ws);
  }

  private async saveTransaction(items: Item[], total: string, totalNano: string, txid: string, sender: string, receiver: string) {
    const products = items.map((item) => {
      return {
        product: item._id,
        quantity: item.count,
        extras: item.extras.map((extra) => extra._id)
      };
    });

    const transaction = {
      products,
      sender,
      receiver,
      txid,
      total: {
        fiat: total,
        nano: totalNano
      }
    };

    const res = await http.post(`/transactions`, transaction);
    return res.data;
  }

}

export const transactionModule = new TransactionModule({ store, name: "transaction" });