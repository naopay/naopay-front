const callOnStore = (): Promise<IDBObjectStore> => {
  // This works on all devices/browsers, and uses IndexedDBShim as a final fallback 
  const indexedDB = window.indexedDB;
  if (!indexedDB) throw new Error("Browser doesn't handle indexedDB");

  // Open (or create) the database
  const open = indexedDB.open("MyDatabase", 1);

  // Create the schema
  open.onupgradeneeded = function () {
    const db = open.result;
    db.createObjectStore("MyObjectStore", { keyPath: "id" });
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

const encrypt = (data: ArrayBuffer, keys: CryptoKeyPair) => {
  return window.crypto.subtle.encrypt(
    {
      name: "RSA-OAEP",
    },
    keys.publicKey,
    data
  )
}

const getKeyDecrypt = async () => {
  const store = await callOnStore();
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

const encryptDataSaveKey = async (data: ArrayBuffer, keys: CryptoKeyPair) => {
  const encrypted = await encrypt(data, keys);
  const store = await callOnStore();
  store.put({ id: 1, keys, encrypted });
  return true;
}

const makeKeys = () => {
  return window.crypto.subtle.generateKey(
    {
      name: "RSA-OAEP",
      modulusLength: 2048,
      publicExponent: new Uint8Array([0x01, 0x00, 0x01]),
      hash: { name: "SHA-256" },
    },
    false, // not extractable
    ["encrypt", "decrypt"]
  )
}

export const CryptoWeb = {
  getKeyDecrypt,
  encryptDataSaveKey,
  makeKeys
}