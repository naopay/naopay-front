<template>
  <span :class="outlined ? 'material-icons-outlined' : 'material-icons'">
    {{ name }}
  </span>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class Icon extends Vue {
  @Prop()
  name!: string;

  @Prop({ default: false })
  outlined!: boolean;
}
</script>