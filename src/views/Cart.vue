<template>
  <div class="flex flex-col justify-between">
    <ul class="flex flex-col gap-8 text-white w-full">
      <li v-for="(item, index) in items" :key="index">
        <div class="flex font-medium text-xl">
          <div class="w-14">x{{ item.count }}</div>
          <div class="flex-1 flex justify-between">
            <div>{{ item.name }}</div>
            <div>${{ item.price.toFixed(2) }}</div>
          </div>
        </div>
        <ul v-if="item.extras.length" class="font-light text-lg text-gray-400">
          <li v-for="extra in item.extras" :key="extra._id" class="ml-14 flex justify-between">
            <div>{{ extra.name }}</div>
            <div>+ ${{ extra.price.toFixed(2) }}</div>
          </li>
        </ul>
      </li>
    </ul>
    <TButton v-if="items.length" class="text-2xl h-20">Checkout ${{ totalAmount.toFixed(2) }}</TButton>
  </div>  
</template>

<script lang="ts">
import { cartModule } from "@/store/cart"
import { Component, Vue } from "vue-property-decorator"

@Component
export default class Cart extends Vue {

  get items() {
    return cartModule.items
  }

  get totalAmount() {
    return cartModule.totalAmount
  }
}
</script>