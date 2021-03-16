<template>
  <div
    class="flex flex-wrap gap-4 content-start overflow-y-scroll scrollbar-hidden"
  >
    <CategoryCard
      v-for="category in categories"
      :key="category._id"
      :category="category"
      @click.native="onClick(category)"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator"
import CategoryCard from "@/components/CategoryCard.vue"
import { itemsModule } from "@/store/items"
import { Category } from "@/models/category"

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

  get categories(): Category[] {
    return itemsModule.categories;
  }

}
</script>