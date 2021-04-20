import base64url from "base64url";
import { encode } from 'base64-arraybuffer'
import { http } from "./http";
import { CryptoWeb } from './cryptoweb';
import { AES } from 'crypto-js';
import CryptoJS from 'crypto-js'

const publicKeyCredentialToJSON = (pubKeyCred: any): any => {
  if (pubKeyCred instanceof Array) {
    const arr = [];
    for (const i of pubKeyCred) {
      arr.push(publicKeyCredentialToJSON(i));
    }

    return arr;
  }

  if (pubKeyCred instanceof ArrayBuffer) {
    return encode(pubKeyCred);
  } else if (pubKeyCred instanceof Buffer) {
    return base64url.encode(pubKeyCred);
  }

  if (pubKeyCred instanceof Object) {
    const obj: any = {};

    for (const key in pubKeyCred) {
      obj[key] = publicKeyCredentialToJSON(pubKeyCred[key]);
    }

    return obj;
  }

  return pubKeyCred;
};

const preformatGetAssertReq = (getAssert: any) => {
  getAssert.challenge = base64url.toBuffer(getAssert.challenge);
  for (const allowCred of getAssert.allowCredentials) {
    allowCred.id = base64url.toBuffer(allowCred.id);
  }

  return getAssert;
};

const sendCredentialResponse = async (credential: PublicKeyCredential, username: string) => {
  const responseWeb = publicKeyCredentialToJSON(credential)
  responseWeb.username = username;
  const res = await http.post(`/webauthn/response`, responseWeb);
  if (res.status === 202) {
    return res.data;
  }
  console.error(res.data);
  throw new Error("Credentials rejected");
};

const registerWebAuthn = async (username: string, cipher: string): Promise<boolean> => {
  const res = await http.post(`/webauthn/register`, { username: username, cipher: cipher })
  if (res.status === 201) {
    res.data.challenge = base64url.toBuffer(res.data.challenge)
    res.data.user.id = base64url.toBuffer(res.data.user.id)
    const credential = (await navigator.credentials.create({
      publicKey: res.data
    })) as PublicKeyCredential;

    await sendCredentialResponse(credential, username)
    return true;
  } else {
    throw new Error("Not Working")
  }
};

const loginWebAuthn = async (username: string): Promise<string | undefined> => {
  if (username === "") throw new Error("Username Not Set")
  const res = await http.post(`/webauthn/login`, { username: username })
  if (res.status == 200) {
    const serverAssert = preformatGetAssertReq(res.data);
    const credential = (await navigator.credentials.get({
      publicKey: serverAssert
    })) as PublicKeyCredential;

    // Get server things here
    const serveResp = await sendCredentialResponse(credential, username)
    if (serveResp) {
      const dec = new TextDecoder("utf-8")
      const aesKey = dec.decode(await CryptoWeb.getKeyDecrypt());
      return AES.decrypt(serveResp, aesKey).toString(CryptoJS.enc.Utf8);
    }
  }
};


export const WebAuthn = {
  registerWebAuthn,
  loginWebAuthn
};