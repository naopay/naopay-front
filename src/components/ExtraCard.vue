<template>
  <Card :class="`bg-${color}`">
    <div class="w-full relative">
      <transition-group name="slide-fade">
        <div
          key="added-flag"
          v-if="selected"
          class="w-full flex justify-between items-center text-confirm mb-2"
        >
          <div class="text-sm">ADD</div>
          <Icon name="check_circle" :outlined="false" />
        </div>

        <div key="extra-name" class="text-3xl font-medium text-left">{{ extra.name }}</div>
      </transition-group>
      
    </div>
    <div class="text-xl text-gray-300">+ ${{ extra.price }}</div>
  </Card>
</template>

<script lang="ts">
import { Extra } from "@/models/extra";
import { Component, Prop, Vue } from "vue-property-decorator";
import Card from "./Card.vue";
import Icon from "./Icon.vue";

@Component({
  components: {
    Card,
    Icon,
  },
})
export default class ExtraCard extends Vue {
  @Prop()
  private extra!: Extra;

  @Prop({default: false})
  private selected!: boolean;

  get color() {
    return this.selected ? "selected" : "unselected";
  }
}
</script>

<style scoped>
.slide-fade-enter-active {
  transition: all 200ms ease;
}
.slide-fade-leave-active {
  transition: all 200ms ease;
}
.slide-fade-enter, .slide-fade-leave-to {
  transform: translateY(10px);
  opacity: 0;
}

.slide-fade-move {
  transition: transform 200ms;
}

.slide-fade-leave-active {
  position: absolute;
}
</style>