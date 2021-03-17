<template>
  <div
    class="flex flex-wrap gap-4 content-start overflow-y-scroll scrollbar-hidden"
  >
    <CategoryCard
      v-for="category in categories"
      :key="category._id"
      :category="category"
      :itemCount="countItems(category._id)"
      @click.native="onClick(category)"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator"
import CategoryCard from "@/components/CategoryCard.vue"
import { itemsModule } from "@/store/items"
import { Category } from "@/models/category"
import { cartModule } from "@/store/cart";

@Component({
  components: {
    CategoryCard,
  },
})
export default class Order extends Vue {

  created(): void {
    itemsModule.fetchCategories();
  }

  onClick(category: Category): void {
    itemsModule.selectCategory(category._id);
  }

  countItems(categoryId: string) {
    return cartModule.items.filter(it => it.category === categoryId)
      .map(it => it.count || 0).reduce((a, b) => a + b, 0)
  }

  get categories(): Category[] {
    return itemsModule.categories;
  }

}
</script>