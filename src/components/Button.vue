<template>
  <button
    :class="[
      'flex items-center justify-center text-xl text-lighter bg-blue-600 transition-colors duration-200 active:bg-blue-800',
      full ? 'w-full h-16 rounded-b' : 'px-4 py-2 rounded',
    ]"
  >
    <slot></slot>
  </button>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class Button extends Vue {
  @Prop({ default: false })
  full!: boolean;
}
</script>