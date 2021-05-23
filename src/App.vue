<template>
  <div id="app" class="h-screen flex">
    <InactiveModal v-if="mustReauthenticate" @click="reauthenticate" />
    <Nav v-if="$route.name !== 'Login'"></Nav>
    <router-view />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import Nav from "@/components/Nav.vue";
import InactiveModal from "@/components/InactiveModal.vue";
import { walletModule } from "./store/wallet";
import { http } from "./services/http";

@Component({
  components: {
    Nav,
    InactiveModal,
  },
})
export default class App extends Vue {
  mustReauthenticate = false;

  @Watch("isAppIdle")
  async onIdle() {
    //@ts-ignore
    if (this.isAppIdle && walletModule.isAuthenticated) {
      this.mustReauthenticate = true;

      http.setAccessToken("");
      http.setRefreshToken("");

      walletModule.setSeed("");
      walletModule.setMnemonic("");
      walletModule.setPrivateKey("");
    }
  }

  async reauthenticate() {
    if (await walletModule.login()) {
      this.mustReauthenticate = false;
    }
  }
}
</script>
