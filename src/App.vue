<template>
  <div id="app" class="h-screen flex">
    <Nav v-if="$route.name !== 'Signup'"></Nav>
    <router-view />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Nav from '@/components/Nav.vue'
import { tickerModule } from './store/ticker';
import { terminalWSModule } from './store/terminal-ws';

@Component({
  components: {
    Nav
  },
})
export default class App extends Vue {

  created() {
    tickerModule.subscribeWebsocket()
    terminalWSModule.registerSocket()
  }
  
}
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
