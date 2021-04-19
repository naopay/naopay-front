<template>
  <div class="w-full flex gap-8 p-8 bg-dark select-none">
    <Categories class="flex-1" />
    <transition name="fade" mode="out-in">
      <Items v-if="!currentItem" class="flex-1" />
      <Extras v-else-if="currentExtras.length" class="flex-1" />
    </transition>
    <Cart class="flex-1" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Categories from "@/views/order/Categories.vue";
import Items from "@/views/order/Items.vue";
import Extras from "@/views/order/Extras.vue";
import Cart from "@/views/order/Cart.vue";
import { itemsModule } from "@/store/items";
import { Item } from "@/models/item";
import { Extra } from "@/models/extra";

@Component({
  components: {
    Categories,
    Items,
    Extras,
    Cart,
  },
})
export default class Order extends Vue {
  get currentItem(): Item | undefined {
    return itemsModule.currentItem;
  }

  get currentExtras(): Extra[] {
    return itemsModule.currentExtras;
  }
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  opacity: 1;
  transition: all 200ms ease;
}
.fade-enter {
  opacity: 0;
  transform: translateX(70px);
}
.fade-leave-to {
  opacity: 0;
}
</style>
