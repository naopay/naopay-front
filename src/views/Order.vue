<template>
  <div class="w-full flex">
    <Categories class="bg-dark w-1/3 p-8" />
    
	<Items v-if="!currentItem" class="bg-dark w-1/3 p-8" />
	<Extras v-else class="bg-dark w-1/3 p-8" />

    <!--
    <div v-else class="bg-dark w-1/3 ">
      <div class="py-8 flex flex-wrap gap-4 content-start overflow-y-scroll scrollbar-hidden">
        <ExtraCard v-for="extra in selectedItem.extras" :key="extra.id" :title="extra.name"/>
      </div>
      <TButton>Add to cart</TButton>
    </div>-->
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Categories from "@/views/Categories.vue";
import Items from "@/views/Items.vue";
import Extras from "@/views/Extras.vue";
import { itemsModule } from "@/store/items";
import { Item } from "@/models/item";

@Component({
  components: {
    Categories,
    Items,
	Extras
  },
})
export default class Order extends Vue {
	get currentItem(): Item | undefined {
		return itemsModule.currentItem
	}
}
</script>
