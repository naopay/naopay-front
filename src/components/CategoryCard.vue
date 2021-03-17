<template>
  <Card :class="`bg-${bgColor}`" :animated="true">
    <div class="text-3xl font-medium text-left">{{ category.name }}</div>
    <div class="text-xl">{{ itemCount }} item{{ itemCount > 1 ? 's' : ''}}</div>
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
  private category!: Category

  @Prop({default: 0})
  private itemCount!: number

  get bgColor() {
    return CategoryCard.COLORS[this.category.color ?? 0]
  }

}
</script>