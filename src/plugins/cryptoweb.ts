import axios from 'axios';

export class CryptoWeb {


    private static async callOnStore(): Promise<IDBObjectStore> {

        // This works on all devices/browsers, and uses IndexedDBShim as a final fallback 
        const indexedDB = window.indexedDB;
        if (!indexedDB) throw new Error("Browser doesn't handle indexedDB");

        // Open (or create) the database
        const open = indexedDB.open("MyDatabase", 1);

        // Create the schema
        open.onupgradeneeded = function () {
            const db = open.result;

            const store = db.createObjectStore("MyObjectStore", { keyPath: "id" });
        };

        return new Promise<IDBObjectStore>(resolve => {

            open.onsuccess = function () {
                // Start a new transaction
                const db = open.result;
                const tx = db.transaction("MyObjectStore", "readwrite");
                const store = tx.objectStore("MyObjectStore");
                // Close the db when the transaction is done
                tx.oncomplete = function () {
                    db.close();
                };
                resolve(store)
            }
        });
    }



    static async  getKeyDecrypt() {
        const store = await this.callOnStore();
        const getData = store.get(1);

        return new Promise<ArrayBuffer>(resolve => {
            getData.onsuccess = async function () {
                const keys = getData.result.keys;
                const dataD = new Uint8Array(await window.crypto.subtle.decrypt(
                    {
                        name: "RSA-OAEP",
                        //label: Uint8Array([...]) //optional
                    },
                    keys.privateKey, //from generateKey or importKey above
                    getData.result.encrypted //ArrayBuffer of the data
                ));
                resolve(dataD);
            };
        });



    }

    private static async encrypt(data: ArrayBuffer, keys: CryptoKeyPair) {
        return window.crypto.subtle.encrypt(
            {
                name: "RSA-OAEP",
                //label: Uint8Array([...]) //optional
            },
            keys.publicKey, //from generateKey or importKey above
            data //ArrayBuffer of data you want to encrypt
        )
    }

    static async encryptDataSaveKey(data: ArrayBuffer, keys: CryptoKeyPair) {

        var encrypted = await this.encrypt(data, keys);
        const store = await this.callOnStore();
        store.put({ id: 1, keys, encrypted });
        return true;
    }

    static async makeKeys() {
        return window.crypto.subtle.generateKey(
            {
                name: "RSA-OAEP",
                modulusLength: 2048, //can be 1024, 2048, or 4096
                publicExponent: new Uint8Array([0x01, 0x00, 0x01]),
                hash: { name: "SHA-256" }, //can be "SHA-1", "SHA-256", "SHA-384", or "SHA-512"
            },
            false, //whether the key is extractable (i.e. can be used in exportKey)
            ["encrypt", "decrypt"] //must be ["encrypt", "decrypt"] or ["wrapKey", "unwrapKey"]
        )
    }

}