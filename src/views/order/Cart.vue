<template>
  <div class="flex flex-col justify-between">
    <ul class="flex flex-col gap-8 text-white w-full">
      <li v-for="item in items" :key="item._id + item.extras.map(e => e._id).join('-')">
        <CartItem :item="item" @deleteOne="deleteOne(item)" @deleteAll="deleteAll(item)"/>
      </li>
    </ul>
    <TButton v-if="items.length" class="text-2xl h-20">Checkout ${{ totalAmount.toFixed(2) }}</TButton>
  </div>  
</template>

<script lang="ts">
import { cartModule } from "@/store/cart"
import { Component, Vue } from "vue-property-decorator"
import { Item } from "@/models/item"
import CartItem from "@/components/CartItem.vue"

@Component({
  components: {
    CartItem
  }
})
export default class Cart extends Vue {

  deleteOne(item: Item) {
    cartModule.removeFromCart(item)
  }

  deleteAll(item: Item) {
    cartModule.removeAllFromCart(item)
  }

  get items() {
    return cartModule.items
  }

  get totalAmount() {
    return cartModule.totalAmount
  }
}
</script>