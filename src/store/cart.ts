import { VuexModule, Module, Mutation, Action } from "vuex-class-modules";
import store from "@/store";
import { Item } from "@/models/item";
import { itemsModule } from "./items";

@Module
class CartModule extends VuexModule {
  items: Item[] = []

  get totalAmount() {
    return this.items.map(it => {
      return (it.count! * it.price) 
        + it.count! * (it.extras.map(e => e.price).reduce((a, b) => a + b, 0))
    }).reduce((a, b) => a + b, 0)
  }

  private itemsEqual(it1: Item, it2: Item): boolean {
    return it1._id === it2._id
      && JSON.stringify(it1.extras.map(e => e._id).sort()) 
      == JSON.stringify(it2.extras.map(e => e._id).sort())
  }

  private copy(item: Item): Item {
    return JSON.parse(JSON.stringify(item)) as Item
  }

  @Mutation
  increment(params: { item: Item; incrementBy: number }) {
    params.item.count += params.incrementBy <= 0 ? 1 : params.incrementBy
  }

  @Mutation
  decrement(item: Item) {
    --item.count
  }

  @Mutation
  push(item: Item) {
    if (item.count <= 0) {
      item.count = 1
    }
    this.items.push(item)
  }

  @Mutation
  remove(item: Item) {
    const index = this.items.findIndex(it => this.itemsEqual(it, item))
    if (index === -1) return
    this.items.splice(index, 1)
  }

  @Action
  addToCart(item: Item) {
    const existing = this.items.find(it => this.itemsEqual(it, item))
    if (existing) {
      this.increment({ item: existing, incrementBy: item.count })
    } else {
      this.push(item)
    }
    
    itemsModule.setCurrentItem(undefined)
  }

  @Action
  removeFromCart(item: Item) {
    const existing = this.items.find(it => this.itemsEqual(it, item))
    if (!existing) return

    if (existing.count > 1) {
      this.decrement(existing)
    } else {
      this.remove(item)
    }
  }

  @Action
  removeAllFromCart(item: Item) {
    this.remove(item)
  }
}

export const cartModule = new CartModule({ store, name: "cart" })