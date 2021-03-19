import axios from 'axios';

export const http = axios.create({
  baseURL: process.env.VUE_APP_BACK_URL,
  /*headers: {
    Authorization: 'Bearer {token}'
  }*/
})

export const rpcClient = axios.create({
  baseURL: process.env.VUE_APP_RPC_URL
})

export const powClient = axios.create({
  baseURL: 'https://nault.nanos.cc/proxy'
})