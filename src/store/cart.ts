import { VuexModule, Module, Mutation, Action } from "vuex-class-modules";
import store from "@/store";
import { CartItem } from "@/models/cartItem";

@Module
class CartModule extends VuexModule {
    cartItems: CartItem[] = []

    itemsEqual(it1: CartItem, it2: CartItem) {
      return it1.itemId === it2.itemId
            && JSON.stringify(it1.extraIds.sort()) == JSON.stringify(it2.extraIds.sort())
    }

    @Mutation
    increment(cartItem: CartItem) {
      ++cartItem.count
    }

    @Mutation
    decrement(cartItem: CartItem) {
      --cartItem.count
    }

    @Mutation
    push(cartItem: CartItem) {
      cartItem.count = 1
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
        this.increment(existing)
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