<template>
  <div class="w-full flex justify-center items-center bg-dark">
    <div class="w-36rem bg-white flex flex-col gap-y-8 items-center rounded">
      <div class="text-4xl pt-8">Naopay</div>
      <div v-if="seed" class="w-full text-xl px-8">
        <div
          class="bg-red-500 text-white flex items-center gap-x-3 px-3 py-4 rounded"
        >
          <Icon class="text-5xl" name="error_outline" />
          <div>
            This is your seed, the master key to all of your accounts. Keep it
            in a safe place, it is your <b>only way</b> to recover your funds !
          </div>
        </div>

        <h2 class="mt-4 font-semibold text-center">Seed</h2>
        <div class="break-words text-center">{{ seed }}</div>
        <h2 class="mt-4 font-semibold text-center">Mnemonic</h2>
        <div class="break-words text-center">{{ mnemonic }}</div>

      </div>
      <Button v-if="!publicKey" :full="true" @click.native="generateSeed">
        Create a Nano Wallet
      </Button>
      <Button :full="true" v-if="publicKey" @click.native="login">Log in</Button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { walletModule } from "@/store/wallet";
import Icon from "@/components/Icon.vue";
import Button from "@/components/Button.vue";
import { tickerModule } from "@/store/ticker";
import { terminalModule } from "@/store/terminal";

@Component({
  components: {
    Icon,
    Button
  },
})
export default class Login extends Vue {

  get seed() {
    return walletModule.seed;
  }

  get mnemonic() {
    return walletModule.mnemonic;
  }

  get publicKey() {
    return walletModule.publicKey;
  }

  generateSeed(): void {
    walletModule.generateSeed();
  }

  async login(): Promise<void> {
    if (await walletModule.login()) {
      tickerModule.subscribeWebsocket();
      terminalModule.registerSocket();

      this.$router.push({ name: "Order" });
    }
  }

}
</script>

<style scoped>
.w-36rem {
  width: 36rem;
}
</style>