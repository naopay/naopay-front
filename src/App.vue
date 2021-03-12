<template>
  <div id="app" class="h-screen flex">
    <Nav></Nav>
    <router-view />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Nav from '@/components/Nav.vue'

@Component({
  components: {
    Nav
  },
})
export default class App extends Vue {}
</script>

<style>
html,
body {
  font-family: "Jost", sans-serif;
}

#app {
  font-family: "Jost", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
