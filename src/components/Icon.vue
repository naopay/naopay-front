<template>
  <span class="material-icons-outlined text-4xl">
    <slot></slot>
  </span>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class Icon extends Vue {
}
</script>