<template>
  <Card :class="`bg-${bgColor}`">
    <div class="text-3xl font-medium">{{ title }}</div>
    <div class="text-xl">0 item</div>
  </Card>
</template>

<script lang="ts">
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
  private title!: string;

  @Prop({default: 0})
  private color!: number;

  get bgColor() {
    return CategoryCard.COLORS[this.color];
  }

}
</script>