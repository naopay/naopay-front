<template>
  <button :class="[
  'flex flex-col justify-between w-44 h-60 p-6 rounded shadow-xl text-lighter focus:outline-none',
  'transform active:scale-95 transition duration-200']">
    <slot></slot>
  </button>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class Card extends Vue {}
</script>