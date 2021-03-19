<template>
  <div class="flex flex-col gap-y-8 justify-between text-white">
    <div
      class="flex justify-between items-center h-20 bg-unselected rounded shadow"
    >
      <div class="ml-8 text-lg">1 ⋰⋅⋰ ≈ ${{ ticker.toFixed(2) }}</div>
      <button @click="clearCart" class="w-20">
        <Icon name="clear" />
      </button>
    </div>
    <ul
      class="flex-1 flex flex-col gap-8 w-full overflow-y-scroll scrollbar-hidden"
    >
      <li
        v-for="item in items"
        :key="item._id + item.extras.map((e) => e._id).join('-')"
      >
        <CartItem
          :item="item"
          @deleteOne="deleteOne(item)"
          @deleteAll="deleteAll(item)"
        />
      </li>
    </ul>
    <div class="flex justify-between">
      <div>Total</div>
      <div>${{ totalAmount.toFixed(2) }}</div>
    </div>
    <TButton
      v-if="items.length"
      class="text-2xl h-20"
      @click="startTransactionWS"
    >
      Checkout {{ totalNanoAmount.toFixed(2) }} ⋰⋅⋰
    </TButton>
  </div>
</template>

<script lang="ts">
import { cartModule } from "@/store/cart";
import { Component, Vue } from "vue-property-decorator";
import { Item } from "@/models/item";
import CartItem from "@/components/CartItem.vue";
import Icon from "@/components/Icon.vue";
import { tickerModule } from "@/store/ticker";
import { transactionModule } from "@/store/transaction";
import { nanoModule } from "@/store/nano";
import { tools } from 'nanocurrency-web'

@Component({
  components: {
    CartItem,
    Icon,
  },
})

export default class Cart extends Vue {
  startTransactionWS() {
    transactionModule.subscribeWebsocket({
      account: nanoModule.address,
      price: tools.convert(this.totalNanoAmount.toString(), 'NANO', 'RAW'),
    });
  }

  deleteOne(item: Item) {
    cartModule.removeFromCart(item);
  }

  deleteAll(item: Item) {
    cartModule.removeAllFromCart(item);
  }

  clearCart() {
    cartModule.clearCart();
  }

  get ticker(): number {
    return tickerModule.price;
  }

  get items() {
    return cartModule.items;
  }

  get totalAmount() {
    return cartModule.totalAmount;
  }

  get totalNanoAmount() {
    return cartModule.totalNanoAmount;
  }
}
</script>