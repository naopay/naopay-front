<template>
  <button
    :class="[
      'flex flex-col justify-between w-44 h-60 p-6 rounded shadow-xl text-lighter focus:outline-none',
      'transition duration-200',
      { 'transform active:scale-95': animated },
    ]"
  >
    <slot></slot>
  </button>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class Card extends Vue {
  @Prop({ default: false })
  private animated!: boolean;
}
</script>