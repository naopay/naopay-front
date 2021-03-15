<template>
  <Card :class="`bg-${color}`" @click.native="click">
    <div class="text-3xl font-medium">{{ title }}</div>
    <div class="text-xl">0 item</div>
  </Card>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import Card from "./Card.vue";

@Component({
  components: {
    Card,
  },
})
export default class ItemCard extends Vue {
  @Prop()
  private title!: string;

  private selected = false;

  private click(): void {
    this.selected = !this.selected;
  }

  get color() {
    return this.selected ? "selected" : "unselected"
  }
}
</script>