<template>
  <div class="w-full">
    <div>{{seed}}</div>

    <TButton @click.native="generateSeed">Create a Nano Wallet</TButton>
    <TButton @click.native="login">Connect</TButton>
    <h3>Connected: {{statusConnection}}</h3> 
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { nanoModule } from "@/store/modules/nano";
@Component({
  components: {},
})
export default class Signup extends Vue {
  get seed() {
    return nanoModule.seed;
  }

  get statusConnection() {
    return nanoModule.connected;
  }

  generateSeed() {
    return nanoModule.generateSeed();
  }

  login() {
    return nanoModule.login()
  }
}
</script>