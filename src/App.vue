<template>
  <div id="app" class="h-screen flex">
    <Nav v-if="$route.name !== 'Signup'"></Nav>
    <router-view />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Nav from "@/components/Nav.vue";
import { tickerModule } from "./store/ticker";
import { terminalWSModule } from "./store/terminal-ws";
import { walletModule } from "./store/wallet";

@Component({
  components: {
    Nav,
  },
})
export default class App extends Vue {
  created() {
    tickerModule.subscribeWebsocket();
    terminalWSModule.registerSocket();

    if (!walletModule.connected) {
      this.$router.push("/signup");
    }
  }
}
</script>
