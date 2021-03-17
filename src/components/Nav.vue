<template>
    <nav id="nav" class=" flex flex-col items-center gap-4 pt-4 w-20 bg-darker">
      <NavButton to="/" icon="shopping_cart"></NavButton>
      <NavButton to="/tx" icon="receipt_long"></NavButton>
    </nav>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import NavButton from "@/components/NavButton.vue";

@Component({
  components: {
    NavButton,
  },
})
export default class Nav extends Vue {}
</script>
