<template>
  <button :class="[
  'flex flex-col justify-between w-44 h-60 p-6 rounded shadow-xl text-lighter focus:outline-none',
  'transform active:scale-95 transition-transform duration-200',
  `bg-${bgColor}`
  ]">
    <div class="text-3xl font-medium">{{ title }}</div>
    <div class="text-xl">0 item</div>
  </button>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class Card extends Vue {

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
    return Card.COLORS[this.color];
  }
}
</script>