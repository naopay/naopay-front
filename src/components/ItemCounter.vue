<template>
  <div
    class="flex items-center rounded overflow-hidden w-56 h-20 text-white shadow-lg"
  >
    <CounterButton @click.native="remove" :disabled="count === 1">
      <Icon name="remove" class="text-4xl" />
    </CounterButton>
    <div
      class="flex-1 flex justify-center items-center h-full select-none bg-unselected text-2xl"
    >
      {{ count }}
    </div>
    <CounterButton @click.native="add">
      <Icon name="add" class="text-4xl" />
    </CounterButton>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Icon from "@/components/Icon.vue";
import CounterButton from "@/components/CounterButton.vue";

@Component({
  components: {
    Icon,
    CounterButton,
  },
})
export default class ItemCounter extends Vue {
  count = 1;

  add(): void {
    ++this.count;
    this.$emit("change", this.count);
  }

  remove(): void {
    if (this.count === 1) return;
    --this.count;
    this.$emit("change", this.count);
  }
}
</script>