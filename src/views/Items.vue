<template>
  <div
    class="flex flex-wrap gap-4 content-start overflow-y-scroll scrollbar-hidden"
  >
    <ItemCard
      v-for="item in items"
      :key="item._id"
      :title="item.name"
      @click.native="onClick(item)"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import ItemCard from "@/components/ItemCard.vue";
import { itemsModule } from "@/store/items";
import { Item } from "@/models/item";

@Component({
  components: {
    ItemCard,
  },
})
export default class Order extends Vue {
  onClick(item: Item): void {
	itemsModule.selectItem(item._id)
  }

  get items(): Item[] {
    return itemsModule.currentItems;
  }
}
</script>