import { VuexModule, Module, Mutation, Action } from "vuex-class-modules"
import store from "@/store"
import { MessageBlock, TransactionBlock, TransactionInfo } from "@/models/transaction"
import socketio from "socket.io-client"

@Module
class TerminalWSModule extends VuexModule {
  socket: SocketIOClient.Socket | any = undefined

  @Mutation
  setSocket(socket: SocketIOClient.Socket) {
    this.socket = socket
  }

  @Action
  registerSocket() {
    const socket = socketio(process.env.VUE_APP_BACKEND_WS!)

    socket.on('connect', () => {
      socket.emit('register', {
        role: 'cashier'
      })
    })

    this.setSocket(socket)
  }

  @Action
  sendToTerminal(event: string, ...args: any[]) {
    this.socket.emit(event, args)
  }


}

export const terminalWSModule = new TerminalWSModule({ store, name: "terminalWS" })