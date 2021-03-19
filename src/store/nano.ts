import { VuexModule, Module, Mutation, Action } from "vuex-class-modules"
import { CryptoWeb } from "@/plugins/cryptoweb"
import AES from 'crypto-js/aes'
import CryptoJS from 'crypto-js'
import store from "@/store";
import { WebAuthn } from "@/plugins/webauthn"
import router from "@/router"
import { wallet } from 'nanocurrency-web'

@Module
class NanoModule extends VuexModule {
  seed = "";
  username = "";
  connected = false;
  privateKey = ""
  publicKey = ""
  address = ""

  

  @Action
  async generateSeed() {
    const w = wallet.generate();
    const seed = w.seed;
    
    const privateKey = w.accounts[0].privateKey;
    const publicKey = w.accounts[0].publicKey;
    const address = w.accounts[0].address;
    const safeArray = CryptoJS.enc.Hex.stringify(CryptoJS.lib.WordArray.random(32))
    localStorage.setItem('publickey',publicKey);
    localStorage.setItem('address',address);
    this.setSeed(seed)
    this.setPublicKey(publicKey)
    this.setUsername(publicKey);
    this.setAddress(address);
    const cipher = AES.encrypt(privateKey, safeArray).toString();

    const keyPair = await CryptoWeb.makeKeys();
    const enc = new TextEncoder();

    await CryptoWeb.encryptDataSaveKey(enc.encode(safeArray), keyPair)

    const registerSuccess = await WebAuthn.registerWebAuthn(publicKey, cipher)

    if (registerSuccess) {
      // TODO Successful register
    } else {
      throw new Error("Sign In KO")
    }

  }
  @Mutation
  setAddress(address: string) {
    this.address = address;
  }

  @Mutation
  setPrivateKey(pk: string) {
    this.privateKey = pk;
  }

  @Mutation
  setPublicKey(pk: string) {
    this.publicKey = pk;
  }


  @Action
  async login() {
    if (!this.username) {
      const publicKey = localStorage.getItem('publickey');
      const address = localStorage.getItem("address")
      if (!publicKey || !address) throw new Error("Please register");
      this.setPublicKey(publicKey)
      this.setUsername(publicKey)
      this.setAddress(address)
    }
    const privateKey = await WebAuthn.loginWebAuthn(this.username);
    if (privateKey) {
      this.setPrivateKey(privateKey)
      this.setConnected(true);
      router.push('/order')
    } else {
      throw new Error("Login not working");
    }
  }


  @Mutation
  setSeed(seed: string) {
    this.seed = seed;
  }

  @Mutation
  setConnected(state: boolean) {
    this.connected = state;
  }

  @Mutation
  setUsername(username: string) {
    this.username = username;
  }

  /*
    async generateWallet(): Promise<Wallet> {




        this.wallet = {
            privateKey: privateKey,
            publicKey: publicKey,
            address: address
        }

        console.log(this.wallet);

        this.balance.next("0");

        this.registerSocket();

        return this.wallet;
    }
    */

}

export const nanoModule = new NanoModule({ store, name: "nano" });

