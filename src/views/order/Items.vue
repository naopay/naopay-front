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
import { Component, Vue } from "vue-property-decorator";
import ItemCard from "@/components/ItemCard.vue";
import { itemsModule } from "@/store/items";
import { Item } from "@/models/item";
import { cartModule } from "@/store/cart";

@Component({
  components: {
    ItemCard,
  },
})
export default class Items extends Vue {
  onClick(item: Item): void {
    if (item.extras?.length) {
      itemsModule.selectItem(item._id);
    } else {
      cartModule.addToCart(Item.copy(item, 1));
    }
  }

  getCartCount(itemId: string): number {
    return cartModule.items
      .filter((it) => it._id === itemId)
      .map((it) => it.count || 0)
      .reduce((a, b) => a + b, 0);
  }

  isInCart(itemId: string): boolean {
    return cartModule.items.some((it) => it._id === itemId);
  }

  get items(): Item[] {
    return itemsModule.currentItems;
  }
}
</script>