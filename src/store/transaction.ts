import { VuexModule, Module, Mutation, Action } from "vuex-class-modules"
import store from "@/store"
import { MessageBlock, TransactionBlock, TransactionInfo } from "@/models/transaction"
import { terminalWSModule } from "./terminal-ws"
import { powClient, rpcClient } from "@/plugins/http"
import { nanoModule } from "./nano"
import { block } from 'nanocurrency-web'
import { SignedBlock } from "nanocurrency-web/dist/lib/block-signer"

@Module
class TransactionModule extends VuexModule {

  @Action
  subscribeWebsocket(transaction: TransactionInfo) {
    const ws = new WebSocket(process.env.VUE_APP_WSS_URL!)
    ws.onopen = (e: any) => {
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
      if (eData.ack) return;
      const messageBlock = eData.message as MessageBlock
      const transactionBlock = messageBlock.block as TransactionBlock
      if (transactionBlock.subtype === "send") {
        if (messageBlock.amount !== transaction.price) {
          // TODO Refund
          terminalWSModule.sendToTerminal("transaction", { accepted: false })
        }
        terminalWSModule.sendToTerminal("transaction", { accepted: true })
        const receiveBlock = await this.createBlockReceive(messageBlock);
        const result = await this.processBlock(receiveBlock, false);
      }
    }
  }



  private async processBlock(bloc: SignedBlock, send: boolean) {
    const processB = {
      "action": "process",
      "json_block": "true",
      "block": bloc,
      "subtype": ""
    }
    send ? processB.subtype = "send" : processB.subtype = "receive"
    const res = await rpcClient.post(`/`, processB);

    return res.data
  }

  private async generateWork(hash: string) {
    const generateWorkReq = {
      "action": "work_generate",
      "hash": hash,
      "difficulty": "ffffffc000000000"
    }
    const res = await powClient.post(`/`, generateWorkReq);

    return res.data.work
  }

  private async getAccountKey(account: string) {
    const accountInfo = {
      "action": "account_key",
      "account": account
    }
    const res = await rpcClient.post(`/`, accountInfo)
    return res.data.key
  }

  private async getWalletInfo(account: string) {
    const accountInfo = {
      "action": "account_info",
      "account": account
    }
    const res = await rpcClient.post(`/`, accountInfo)
    if (res.data.error) {
      return {
        frontier: "0".repeat(64),
        balance: "0"
      }
    }

    return {
      frontier : res.data.frontier,
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
      frontier:walletInfo.frontier
    }, walletPK);
  }


}

export const transactionModule = new TransactionModule({ store, name: "transaction" })