<template>
  <div class="w-full flex">
    <div class="bg-dark w-1/3 p-8 flex flex-wrap gap-4 content-start">
      <router-link
        v-for="category in categories"
        :key="category._id"
        :to="`/order/${category._id}`">
        <Card
          :title="category.name"
          :color="category.color"
        />
      </router-link>

      <TButton @click="$store.dispatch('items/fetchCategories')">Fetch</TButton>
    </div>
    <router-view />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Card from "@/components/Card.vue";
import { itemsModule } from "@/store/modules/items";

@Component({
  components: {
    Card,
  },
})
export default class Order extends Vue {

  get categories() {
    return itemsModule.categories
  }

}
</script>
