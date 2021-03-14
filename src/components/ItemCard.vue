<template>
  <Card :color="color">
    <div class="text-3xl font-medium">{{ title }}</div>
    <div class="text-xl">0 item</div>
  </Card>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import Card from './Card.vue';

@Component({
    components: {
        Card
    }
})
export default class ItemCard extends Vue {

  @Prop()
  private title!: string;

  @Prop({default: 0})
  private color!: number;

}
</script>