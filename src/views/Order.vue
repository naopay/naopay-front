<template>
  <div class="w-full flex">
    <Categories class="bg-dark w-1/3 p-8" />

    <Items v-if="!currentItem" class="bg-dark w-1/3 p-8" />
    <Extras v-else-if="currentExtras.length" class="bg-dark w-1/3 p-8" />
    <Cart/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator"
import Categories from "@/views/Categories.vue"
import Items from "@/views/Items.vue"
import Extras from "@/views/Extras.vue"
import Cart from "@/views/Cart.vue"
import { itemsModule } from "@/store/items"
import { Item } from "@/models/item"
import { Extra } from "@/models/extra"

@Component({
  components: {
    Categories,
    Items,
    Extras,
    Cart
  },
})
export default class Order extends Vue {
  get currentItem(): Item | undefined {
    return itemsModule.currentItem
  }

  get currentExtras(): Extra[] {
    return itemsModule.currentExtras;
  }
}
</script>
