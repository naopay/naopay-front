import { VuexModule, Module, Mutation, Action } from "vuex-class-modules";
import { http } from "@/plugins/http";
import store from "@/store";
import { CartItem } from "@/models/cartItem";
import { Item } from "@/models/item";

@Module
class CartModule extends VuexModule {
    cartItems: CartItem[] = []

    

    @Action
    addToCart(item: Item) {
        //TODO this.cartItems.find(it => it.)
    }
}

export const cartModule = new CartModule({ store, name: "cart" });