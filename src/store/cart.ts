import { VuexModule, Module, Mutation, Action } from "vuex-class-modules";
import store from "@/store";
import { CartItem } from "@/models/cartItem";
import { Item } from "@/models/item";
import { itemsModule } from "./items";

@Module
class CartModule extends VuexModule {
  cartItems: CartItem[] = []

  get items(): Item[] {
    const allItems = itemsModule.categories.flatMap(cat => cat.items || [])

    return this.cartItems.map(cartItem => {
      const original = allItems.find(it => it._id === cartItem.itemId)
      if (!original) {
        return undefined
      }
      
      const item = this.copy(original)
      item.extras = item.extras.filter(extra => 
        cartItem.extraIds!.some(id => id === extra._id))
      item.count = cartItem.count
      return item
    }).filter(it => it) as Item[]
  }

  private itemsEqual(it1: CartItem, it2: CartItem): boolean {
    return it1.itemId === it2.itemId
      && JSON.stringify(it1.extraIds?.sort()) == JSON.stringify(it2.extraIds?.sort())
  }

  private copy(item: Item): Item {
    return JSON.parse(JSON.stringify(item)) as Item
  }

  @Mutation
  increment(params: { cartItem: CartItem; incrementBy: number }) {
    params.cartItem.count += params.incrementBy <= 0 ? 1 : params.incrementBy
  }

  @Mutation
  decrement(cartItem: CartItem) {
    --cartItem.count
  }

  @Mutation
  push(cartItem: CartItem) {
    if (cartItem.count <= 0) {
      cartItem.count = 1
    }
    this.cartItems.push(cartItem)
  }

  @Mutation
  remove(cartItem: CartItem) {
    const index = this.cartItems.findIndex(it => this.itemsEqual(it, cartItem))
    this.cartItems.splice(index, 1)
  }

  @Action
  addToCart(cartItem: CartItem) {
    const existing = this.cartItems.find(it => this.itemsEqual(it, cartItem))
    if (existing) {
      this.increment({ cartItem: existing, incrementBy: cartItem.count })
    } else {
      this.push(cartItem)
    }
  }

  @Action
  removeFromCart(cartItem: CartItem) {
    const existing = this.cartItems.find(it => this.itemsEqual(it, cartItem))
    if (!existing) return

    if (existing.count > 1) {
      this.decrement(existing)
    } else {
      this.remove(cartItem)
    }
  }
}

export const cartModule = new CartModule({ store, name: "cart" })