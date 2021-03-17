<template>
  <div>
    <ul class="text-white">
      <li v-for="(item, index) in items" :key="index">
        {{ item.count }} {{ item.name }}
        <ul v-if="item.extras.length">
          <li v-for="extra in item.extras" :key="extra._id">
            {{ extra.name }}
          </li>
        </ul>
      </li>
    </ul>
  </div>  
</template>

<script lang="ts">
import { cartModule } from "@/store/cart"
import { Component, Vue } from "vue-property-decorator"

@Component
export default class Cart extends Vue {

  get items() {
    return cartModule.items
  }
}
</script>