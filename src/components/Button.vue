<template>
  <button class="w-full h-24 bg-blue-600">
    <slot></slot>
  </button>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class Button extends Vue {

}
</script>