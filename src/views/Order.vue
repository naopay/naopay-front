<template>
  <div class="w-full flex">
    <div class="bg-dark w-1/3 p-8 flex flex-wrap gap-4 content-start overflow-y-scroll scrollbar-hidden">
      <CategoryCard
        v-for="category in categories"
        :key="category._id"
        :title="category.name"
        :color="category.color"
        @click.native="categoryClick(category._id)"
      />
    </div>
    <div
      class="bg-dark w-1/3 p-8 flex flex-wrap gap-4 content-start overflow-y-scroll scrollbar-hidden">
      <ItemCard v-for="item in items" :key="item._id" :title="item.name" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import ItemCard from "@/components/ItemCard.vue";
import CategoryCard from "@/components/CategoryCard.vue";
import { itemsModule } from "@/store/modules/items";
import { Category } from "@/models/category";
import { Item } from "@/models/item";

@Component({
  components: {
    CategoryCard,
    ItemCard
  },
})
export default class Order extends Vue {
  private categoryId!: string;

  created(): void {
    itemsModule.fetchCategories();
  }

  categoryClick(categoryId: string): void {
    this.categoryId = categoryId;
    itemsModule.fetchItems(this.categoryId);
  }

  get categories(): Category[] {
    return itemsModule.categories;
  }

  get items(): Item[] | undefined {
    return itemsModule.currentItems;
  }
}
</script>

<style scoped>
.scrollbar-hidden {
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
}

.scrollbar-hidden::-webkit-scrollbar {
  display: none; /* Chrome */
}
</style>
