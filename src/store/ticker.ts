import { VuexModule, Module, Mutation, Action } from "vuex-class-modules"
import store from "@/store"

@Module
class TickerModule extends VuexModule {
  price: number | undefined

  @Mutation
  updatePrice(price: number) {
    this.price = price
  }
}

export const tickerModule = new TickerModule({ store, name: "ticker" })