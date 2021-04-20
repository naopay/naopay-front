<template>
  <router-link
    :to="to"
    :class="[
      'flex justify-center items-center rounded w-12 h-12 transition-colors duration-200',
      $route.path === to
        ? 'bg-dark text-blue-300'
        : 'bg-transparent text-gray-400',
    ]"
  >
    <Icon :name="icon" :outlined="true" class="text-4xl" />
  </router-link>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import Icon from "@/components/Icon.vue";

@Component({
  components: {
    Icon,
  },
})
export default class NavButton extends Vue {
  @Prop()
  to!: string;

  @Prop()
  icon!: string;
}
</script>