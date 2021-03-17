<template>
  <div
    class="flex flex-wrap gap-4 content-start overflow-y-scroll scrollbar-hidden"
  >
    <ItemCard
      v-for="item in items"
      :key="item._id"
      :item="item"
      :selected="isInCart(item._id)"
      :count="getCartCount(item._id)"
      @click.native="onClick(item)"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator"
import ItemCard from "@/components/ItemCard.vue"
import { itemsModule } from "@/store/items"
import { Item } from "@/models/item"
import { cartModule } from "@/store/cart"
import { CartItem } from "@/models/cartItem"

@Component({
  components: {
    ItemCard,
  },
})
export default class Order extends Vue {
  
  onClick(item: Item): void {
    if (item.extras?.length) {
      itemsModule.selectItem(item._id)
    } else {
      cartModule.addToCart(new CartItem(item._id))
    }
  }

  getCartCount(itemId: string): number {
    return cartModule.cartItems.filter(it => it.itemId === itemId)
      .map(it => it.count).reduce((a, b) => a + b, 0)
  }

  isInCart(itemId: string): boolean {
    return cartModule.cartItems.some(it => it.itemId === itemId)
  }

  get items(): Item[] {
    return itemsModule.currentItems;
  }
}
</script>