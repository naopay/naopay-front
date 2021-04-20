<template>
  <button
    :class="[
      'flex-1 flex justify-center items-center h-full',
      'focus:outline-none transition-colors duration-200 bg-unselected',
      disabled ? 'bg-opacity-60' : 'active:bg-selected',
    ]"
  >
    <slot></slot>
  </button>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
@Component
export default class CounterButton extends Vue {
  @Prop({ default: false })
  disabled!: boolean;
}
</script>