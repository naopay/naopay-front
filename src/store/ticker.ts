import { VuexModule, Module, Mutation, Action } from "vuex-class-modules";
import store from "@/store";

@Module
class TickerModule extends VuexModule {
  price = 0;

  @Mutation
  updatePrice(price: number) {
    this.price = price;
  }

  @Action
  subscribeWebsocket() {
    const ws = new WebSocket('wss://ws.kraken.com');
    ws.onopen = () => {
      ws.send(JSON.stringify({
        event: "subscribe",
        pair: [
          "NANO/USD"
        ],
        subscription: {
          name: "ticker"
        }
      }));
    };

    ws.onmessage = (e: any) => {
      const data = JSON.parse(e.data);
      if (Array.isArray(data)) {
        const price = data[1].c[0];
        if (price != undefined) {
          this.updatePrice(Number(price));
        }
      }
    };
  }

}

export const tickerModule = new TickerModule({ store, name: "ticker" })