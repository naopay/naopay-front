<template>
  <div class="flex flex-col justify-between">
    <div
      class="flex flex-wrap gap-4 content-start overflow-y-scroll scrollbar-hidden"
    >
      <ExtraCard
        v-for="extra in extras"
        :key="extra._id"
        :extra="extra"
        :selected="isSelected(extra)"
        @click.native="select(extra)"
      />
    </div>
    <div class="flex gap-4">
      <ItemCounter @change="itemCount = $event"/>
      <TButton @click.native="addToCart" class="flex-1 text-2xl h-20">Add to cart</TButton>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import ExtraCard from "@/components/ExtraCard.vue";
import ItemCounter from "@/components/ItemCounter.vue";
import { itemsModule } from "@/store/items";
import { Extra } from "@/models/extra";
import { Item } from "@/models/item";
import { cartModule } from "@/store/cart";
import { CartItem } from "@/models/cartItem";

@Component({
  components: {
    ExtraCard,
    ItemCounter
  },
})
export default class Order extends Vue {
  private extraIds: string[] = []
  private itemCount = 1

  isSelected(extra: Extra): boolean {
    return this.extraIds.some(id => id === extra._id)
  }

  select(extra: Extra): void {
    const existingIndex = this.extraIds.findIndex((id) => id === extra._id)
    if (existingIndex == -1) {
      this.extraIds.push(extra._id)
    } else {
      this.extraIds.splice(existingIndex, 1)
    }
  }

  addToCart(): void {
    const cartItem = new CartItem(this.item!._id, [...this.extraIds], this.itemCount)
    cartModule.addToCart(cartItem)
  }

  get item(): Item | undefined {
    return itemsModule.currentItem
  }

  get extras(): Extra[] {
    return itemsModule.currentExtras
  }
}
</script>