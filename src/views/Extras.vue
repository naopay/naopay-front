<template>
  <div class="flex flex-wrap gap-4 content-start overflow-y-scroll scrollbar-hidden">
    <ExtraCard v-for="extra in extras" :key="extra._id" :title="extra.name" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import ExtraCard from "@/components/ExtraCard.vue";
import { itemsModule } from "@/store/items";
import { Extra } from "@/models/extra";

@Component({
  components: {
    ExtraCard,
  },
})
export default class Order extends Vue {
  
  get extras(): Extra[] {
    return itemsModule.currentExtras;
  }

}
</script>