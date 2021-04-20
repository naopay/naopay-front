import axios from 'axios';

export const http = axios.create({
  baseURL: process.env.VUE_APP_BACK_URL,
  // TODO Auth token
  /*headers: {
    Authorization: 'Bearer {token}'
  }*/
});

export const rpcClient = axios.create({
  baseURL: process.env.VUE_APP_RPC_URL
});

export const powClient = axios.create({
  baseURL: process.env.VUE_APP_POW_URL
});