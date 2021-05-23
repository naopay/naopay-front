<template>
  <div
    class="absolute z-50 top-0 left-0 h-full w-full bg-black bg-opacity-50 flex items-center justify-center"
  >
    <div class="shadow">
      <div
        class="flex gap-x-6 items-center rounded-t bg-lighter p-8 text-darker"
      >
        <Icon name="lock" :outlined="true" class="text-4xl" />
        <div class="text-xl">
          Your session has been locked due to inactivity
        </div>
      </div>

      <button
        @click="onClick"
        class="w-full flex items-center justify-center h-16 rounded-b text-lighter text-xl bg-blue-600 transition-colors duration-200 active:bg-blue-800"
      >
        Unlock
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Icon from "@/components/Icon.vue";

@Component({
  components: {
    Icon,
  },
})
export default class InactiveModal extends Vue {
  onClick() {
    this.$emit("click");
  }
}
</script>