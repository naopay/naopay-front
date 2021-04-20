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
      <ItemCounter @change="itemCount = $event" />
      <Button @click.native="addToCart" class="flex-1 text-2xl h-20">
        Add to cart
      </Button>
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

@Component({
  components: {
    ExtraCard,
    ItemCounter,
  },
})
export default class Extras extends Vue {
  private selectedExtras: Extra[] = [];
  private itemCount = 1;

  isSelected(extra: Extra): boolean {
    return this.selectedExtras.some((e) => e._id === extra._id);
  }

  select(extra: Extra): void {
    const existingIndex = this.selectedExtras.findIndex(
      (e) => e._id === extra._id
    );
    if (existingIndex == -1) {
      this.selectedExtras.push(extra);
    } else {
      this.selectedExtras.splice(existingIndex, 1);
    }
  }

  addToCart(): void {
    cartModule.addToCart(
      Item.copy(this.item, this.itemCount, this.selectedExtras)
    );
  }

  get item(): Item {
    return itemsModule.currentItem!;
  }

  get extras(): Extra[] {
    return itemsModule.currentExtras;
  }
}
</script>