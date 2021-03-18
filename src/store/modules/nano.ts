import { VuexModule, Module, Mutation, Action } from "vuex-class-modules";
import { http } from "@/plugins/http";
import {CryptoWeb} from "@/plugins/cryptoweb";
import AES from 'crypto-js/aes';
import CryptoJS from 'crypto-js'
import * as nanocurrency from 'nanocurrency'
import store from "@/store/store";
import { WebAuthn } from "@/plugins/webauthn";


//const decypher = AES.decrypt(cipher, safeArray).toString(CryptoJS.enc.Utf8);

@Module
class NanoModule extends VuexModule {
    seed = "";
    username = "";
    connected = false;


    @Action
    async generateSeed() {
        const seed = await nanocurrency.generateSeed();
        const privateKey = nanocurrency.deriveSecretKey(seed, 0);
        const publicKey = nanocurrency.derivePublicKey(privateKey);
        const address = nanocurrency.deriveAddress(publicKey);
        const safeArray = CryptoJS.enc.Hex.stringify(CryptoJS.lib.WordArray.random(32))

        this.setSeed(seed)
        this.setUsername(publicKey);

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


    @Action
    async login() {
        const privateKey = await WebAuthn.loginWebAuthn(this.username);
        if (privateKey) {
            this.setConnected(true);
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

