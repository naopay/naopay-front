import { VuexModule, Module, Mutation, Action } from "vuex-class-modules"
import store from "@/store"
import { MessageBlock, TransactionBlock, TransactionInfo } from "@/models/transaction"
import { terminalWSModule } from "./terminal-ws"

@Module
class TransactionModule extends VuexModule {
  price = 0

  @Mutation
  updatePrice(price: number) {
    this.price = price
  }

  @Mutation


  @Action
  subscribeWebsocket(transaction: TransactionInfo) {
    const ws = new WebSocket('ws://188.166.0.186:17078')
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

    ws.onmessage = (e: any) => {
      const data = JSON.parse(e.data.message) as MessageBlock
      const block = data.block as TransactionBlock
      if (block.subtype === "send") {
        if (data.amount !== transaction.price) {
          // TODO Refund
          terminalWSModule.sendToTerminal("transaction", { accepted: false })
        }
        terminalWSModule.sendToTerminal("transaction", { accepted: true })
      }
    }
  }


}

export const transactionModule = new TransactionModule({ store, name: "transaction" })