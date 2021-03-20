<template>
  <div class="w-full flex justify-center items-center bg-dark">
    <div class="w-1/2 bg-white flex flex-col gap-y-4 items-center p-8 rounded">
      <div class="text-5xl font-semibold">NanoPOS</div>
      <div v-if="seed" class="w-full text-xl">
        <div class="bg-red-500 text-white flex items-center gap-x-3 px-3 py-4 rounded">
          <Icon class="text-5xl" name="error_outline"/>
          <div>
            This is your seed, the master key to all of your accounts. Keep it
            in a safe place, its your <b>only way</b> to recover your funds !
          </div>
        </div>

        <div class="break-words text-center mt-4">{{ seed }}</div>
      </div>
      <TButton v-if="!publicKey" @click.native="generateSeed"
        >Create a Nano Wallet</TButton
      >
      <TButton v-if="publicKey" @click.native="login">Connect</TButton>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { nanoModule } from "@/store/nano";
import Icon from "@/components/Icon.vue"
@Component({
  components: {
    Icon
  },
})
export default class Signup extends Vue {
  get seed() {
    return nanoModule.seed;
  }

  get publicKey() {
    return nanoModule.publicKey;
  }

  get statusConnection() {
    return nanoModule.connected;
  }

  generateSeed() {
    return nanoModule.generateSeed();
  }

  login() {
    return nanoModule.login();
  }
}
</script>