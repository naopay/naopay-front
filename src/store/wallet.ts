import { VuexModule, Module, Mutation, Action } from "vuex-class-modules";
import { CryptoWeb } from "@/services/cryptoweb";
import AES from "crypto-js/aes";
import Hex from "crypto-js/enc-hex"
import CryptoJS from "crypto-js";
import store from "@/store";
import { WebAuthn } from "@/services/webauthn";
import { wallet } from "nanocurrency-web";

@Module
class WalletModule extends VuexModule {
  seed = "";
  mnemonic = "";
  privateKey = "";
  publicKey = localStorage.getItem("publickey");
  address = "";

  get isAuthenticated() {
    return this.privateKey != undefined && this.privateKey.length > 0;
  }

  @Action
  async generateSeed() {
    const w = wallet.generate();

    const privateKey = w.accounts[0].privateKey;
    const publicKey = w.accounts[0].publicKey;
    const address = w.accounts[0].address;
    
    const safeArray = Hex.stringify(CryptoJS.lib.WordArray.random(32))
    localStorage.setItem('publickey', publicKey);
    localStorage.setItem('address', address);
    this.setSeed(w.seed);
    this.setMnemonic(w.mnemonic);
    this.setPublicKey(publicKey);
    this.setAddress(address);
    const cipher = AES.encrypt(privateKey, safeArray).toString();

    const keyPair = await CryptoWeb.makeKeys();
    const enc = new TextEncoder();

    await CryptoWeb.encryptDataSaveKey(enc.encode(safeArray), keyPair);

    const registerSuccess = await WebAuthn.registerWebAuthn(publicKey, cipher);

    if (!registerSuccess) {
      throw new Error("Error registering with WebAuthn");
    }
  }

  @Mutation
  setAddress(address: string) {
    this.address = address;
  }

  @Mutation
  setPrivateKey(privateKey: string) {
    this.privateKey = privateKey;
  }

  @Mutation
  setPublicKey(publicKey: string) {
    this.publicKey = publicKey;
  }

  @Mutation
  setSeed(seed: string) {
    this.seed = seed;
  }

  @Mutation
  setMnemonic(mnemonic: string) {
    this.mnemonic = mnemonic;
  }

  @Action
  async login(): Promise<boolean> {
    if (!this.publicKey) {
      const publicKey = localStorage.getItem('publickey');
      const address = localStorage.getItem("address");
      if (!publicKey || !address) throw new Error("Please register");
      this.setPublicKey(publicKey);
      this.setAddress(address);
    }

    const privateKey = await WebAuthn.loginWebAuthn(this.publicKey!);
    if (privateKey) {
      this.setPrivateKey(privateKey);
      return true;
    } else {
      return false;
    }
  }

}

export const walletModule = new WalletModule({ store, name: "wallet" });

