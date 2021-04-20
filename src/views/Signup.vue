<template>
  <div class="w-full flex justify-center items-center bg-dark">
    <div class="w-1/2 bg-white flex flex-col gap-y-4 items-center p-8 rounded">
      <div class="text-5xl font-semibold">NaoPay</div>
      <div v-if="seed" class="w-full text-xl">
        <div
          class="bg-red-500 text-white flex items-center gap-x-3 px-3 py-4 rounded"
        >
          <Icon class="text-5xl" name="error_outline" />
          <div>
            This is your seed, the master key to all of your accounts. Keep it
            in a safe place, its your <b>only way</b> to recover your funds !
          </div>
        </div>

        <div class="break-words text-center mt-4">{{ seed }}</div>
      </div>
      <Button v-if="!publicKey" @click.native="generateSeed">
        Create a Nano Wallet
      </Button>
      <Button v-if="publicKey" @click.native="login">Connect</Button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { walletModule } from "@/store/wallet";
import Icon from "@/components/Icon.vue";
import Button from "@/components/Button.vue";

@Component({
  components: {
    Icon,
    Button
  },
})
export default class Signup extends Vue {
  get seed() {
    return walletModule.seed;
  }

  get publicKey() {
    return walletModule.publicKey;
  }

  get statusConnection() {
    return walletModule.connected;
  }

  generateSeed(): void {
    walletModule.generateSeed();
  }

  async login(): Promise<void> {
    await walletModule.login();
    if (walletModule.connected) {
      this.$router.push({ name: "Order" });
    }
  }
}
</script>