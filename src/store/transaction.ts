import { VuexModule, Module, Mutation, Action } from "vuex-class-modules"
import store from "@/store"
import { MessageBlock, TransactionBlock, TransactionInfo } from "@/models/transaction"
import { terminalWSModule } from "./terminal-ws"
import { http, powClient, rpcClient } from "@/plugins/http"
import { nanoModule } from "./nano"
import { block } from 'nanocurrency-web'
import { SignedBlock } from "nanocurrency-web/dist/lib/block-signer"
import { cartModule } from "./cart"
import { TransactionStatus } from "./transaction-status"
import { Item } from "@/models/item"

@Module
class TransactionModule extends VuexModule {

  status: TransactionStatus = TransactionStatus.NONE

  get transactionIsAccepted(): boolean {
    return this.status === TransactionStatus.ACCEPTED
  }

  get transactionIsRejected(): boolean {
    return this.status === TransactionStatus.REJECTED
  }

  @Mutation
  setStatus(status: TransactionStatus) {
    this.status = status
  }

  @Action
  subscribeWebsocket(transaction: TransactionInfo) {
    if (this.status === TransactionStatus.PENDING) return;
    this.setStatus(TransactionStatus.PENDING)
    const ws = new WebSocket(process.env.VUE_APP_WSS_URL!)
    ws.onopen = () => {
      ws.send(JSON.stringify({
        action: "subscribe",
        topic: "confirmation",
        options: {
          accounts: [
            transaction.account
          ]
        }
      }))
    }

    ws.onmessage = async (e: any) => {
      const eData = JSON.parse(e.data)
      if (eData.ack) return
      const messageBlock = eData.message as MessageBlock
      const transactionBlock = messageBlock.block as TransactionBlock
      if (transactionBlock.subtype === "send") {
        if (messageBlock.amount !== transaction.price) {
          terminalWSModule.sendToTerminal("transaction", { accepted: false })
          
          this.setStatus(TransactionStatus.ACCEPTED)
          setTimeout(() => {
            this.setStatus(TransactionStatus.NONE)
          }, 1000)

          const receiveBlock = await this.createBlockReceive(messageBlock);
          await this.processBlock(receiveBlock, false)
          const sendBlock = await this.createBlockSend(messageBlock.amount, messageBlock.account)
          await this.processBlock(sendBlock, true)
          ws.close();
          return;
        }

        terminalWSModule.sendToTerminal("transaction", { accepted: true })

        const items = [...cartModule.items]
        const totalAmount = cartModule.totalAmount.toString()
        const totalNano = cartModule.totalNanoAmount.toFixed(3)
        this.saveTransactionDB(items,totalAmount, totalNano, messageBlock.hash, messageBlock.account, nanoModule.address)
        
        this.setStatus(TransactionStatus.ACCEPTED)
        setTimeout(() => {
          cartModule.clearCart()
          this.setStatus(TransactionStatus.NONE)
        }, 1000)

        const receiveBlock = await this.createBlockReceive(messageBlock)
        this.processBlock(receiveBlock, false)
        ws.close();
      }
    }
  }

  private async saveTransactionDB(items: Item[], total: string, totalNano: string, txid: string, sender: string, receiver: string) {
    const products = items.map((item) => {
      return {
        product: item._id,
        quantity: item.count,
        extras: item.extras.map((extra) => extra._id)
      }
    })
    const transaction = {
      products,
      sender,
      receiver,
      txid,
      total: {
        fiat: total,
        nano: totalNano
      }
    }
    console.log(transaction);
    
    const res = await http.post(`/transactions`, transaction);
    return res.data;
  }



  private async processBlock(block: SignedBlock, send: boolean) {
    const processB = {
      action: "process",
      "json_block": "true",
      block: block,
      subtype: ""
    }
    send ? processB.subtype = "send" : processB.subtype = "receive"
    const res = await rpcClient.post(`/`, processB);

    return res.data.hash
  }

  private async generateWork(hash: string) {
    const difficulty = await powClient.post(`/`, { action: "active_difficulty" })

    const generateWorkReq = {
      action: "work_generate",
      hash: hash,
      difficulty: difficulty.data.network_current
    }
    const res = await powClient.post(`/`, generateWorkReq);

    return res.data.work
  }

  private async getAccountKey(account: string) {
    const accountInfo = {
      action: "account_key",
      account: account
    }
    const res = await rpcClient.post(`/`, accountInfo)
    return res.data.key
  }

  private async getWalletInfo(account: string) {
    const accountInfo = {
      action: "account_info",
      account: account
    }
    const res = await rpcClient.post(`/`, accountInfo)
    if (res.data.error) {
      return {
        frontier: "0".repeat(64),
        balance: "0"
      }
    }

    return {
      frontier: res.data.frontier,
      balance: res.data.balance,
    }
  }

  private async createBlockReceive(message: MessageBlock) {
    const walletPK = nanoModule.privateKey;
    const walletInfo = await this.getWalletInfo(message.block.link_as_account)
    let hash;
    if (walletInfo.frontier === "0".repeat(64)) {
      hash = await this.getAccountKey(nanoModule.address)
    } else {
      hash = walletInfo.frontier
    }
    const work = await this.generateWork(hash)
    return block.receive({
      walletBalanceRaw: walletInfo.balance,
      amountRaw: message.amount,
      toAddress: nanoModule.address,
      representativeAddress: nanoModule.address,
      transactionHash: message.hash,
      work: work,
      frontier: walletInfo.frontier
    }, walletPK);
  }

  private async createBlockSend(amountRaw: string, toAddress: string) {
    const walletPK = nanoModule.privateKey;
    const walletInfo = await this.getWalletInfo(nanoModule.address)
    const hash = walletInfo.frontier;
    const work = await this.generateWork(hash)
    return block.send({
      walletBalanceRaw: walletInfo.balance,
      amountRaw,
      fromAddress: nanoModule.address,
      toAddress,
      representativeAddress: nanoModule.address,
      work,
      frontier: walletInfo.frontier
    }, walletPK);
  }


}

export const transactionModule = new TransactionModule({ store, name: "transaction" })