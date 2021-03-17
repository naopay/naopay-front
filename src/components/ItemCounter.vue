<template>
  <div class="flex items-center">
    <button @click="remove">
      <Icon name="remove"/>
    </button>
    <div>
      {{ count }}
    </div>
    <button @click="add">
      <Icon name="add"/>
    </button>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import Icon from '@/components/Icon.vue'

@Component({
  components: {
    Icon
  }
})
export default class ItemCounter extends Vue {

  private count = 0

  add() {
    ++this.count
    this.$emit("change", this.count)
  }

  remove() {
    --this.count
    this.$emit("change", this.count)
  }
}
</script>