<template>
  <div class="bg-dark w-1/3 p-8 flex flex-wrap gap-4 content-start">
  <!--
    <Card
      v-for="category in $store.state.items.items"
      :key="category._id"
      :title="category.name"
      :color="category.color"
    >
    </Card>

    <TButton @click="$store.dispatch('items/fetchCategories')">Fetch</TButton>-->
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Card from "@/components/Card.vue";

@Component({
  components: {
    Card,
  },
})
export default class Items extends Vue {}
</script>
