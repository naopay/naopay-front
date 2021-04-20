<template>
  <Card :class="`bg-${color}`">
    <div class="text-5xl font-medium">{{ count }}</div>
    <div class="text-2xl font-medium text-left">{{ item.name }}</div>
    <div>${{ item.price.toFixed(2) }}</div>
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
  item!: Item;

  @Prop({ default: 0 })
  count!: number;

  @Prop({ default: false })
  selected!: boolean;

  get color(): string {
    return this.selected ? "selected" : "unselected";
  }
}
</script>