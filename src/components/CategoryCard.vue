<template>
  <Card :class="`bg-${bgColor}`" :animated="true">
    <div class="text-3xl font-medium">{{ category.name }}</div>
    <div class="text-xl">0 item</div>
  </Card>
</template>

<script lang="ts">
import { Category } from '@/models/category';
import { Component, Prop, Vue } from 'vue-property-decorator';
import Card from './Card.vue';

@Component({
  components: {
    Card
  }
})
export default class CategoryCard extends Vue {

  private static readonly COLORS = [
    "blue-400",
    "green-600",
    "yellow-500",
    "indigo-500",
    "pink-500",
    "red-400",
  ];

  @Prop()
  private category!: Category;

  get bgColor() {
    return CategoryCard.COLORS[this.category.color ?? 0];
  }

}
</script>