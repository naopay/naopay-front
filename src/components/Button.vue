<template>
  <button class="px-4 py-2 bg-blue-600 text-white rounded shadow transition-colors duration-200 active:bg-blue-800">
    <slot></slot>
  </button>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class Button extends Vue {

}
</script>