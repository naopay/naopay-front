<template>
  <Card :class="`bg-${color}`" @click.native="click">
    <div class="text-3xl font-medium text-left">{{ item.name }}</div>
    <div class="text-xl">0 item</div>
  </Card>
</template>

<script lang="ts">
import { Item } from "@/models/item";
import { Component, Prop, Vue } from "vue-property-decorator";
import Card from "./Card.vue";

@Component({
  components: {
    Card,
  },
})
export default class ItemCard extends Vue {
  @Prop()
  private item!: Item;

  private selected = false;

  private click(): void {
    this.selected = !this.selected;
  }

  get color() {
    return this.selected ? "selected" : "unselected"
  }
}
</script>