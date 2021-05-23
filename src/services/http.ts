import router from "@/router";
import axios from "axios";


let accessToken: string;
let refreshToken: string;

const setAccessToken = (aToken: string) => {
  accessToken = aToken;
};

const setRefreshToken = (rToken: string) => {
  refreshToken = rToken;
};

const api = axios.create({
  baseURL: process.env.VUE_APP_BACK_URL,
});

api.interceptors.request.use(
  config => {
    if (accessToken) {
      config.headers['Authorization'] = 'Bearer ' + accessToken;
    }
    config.headers['Content-Type'] = 'application/json';
    return config;
  },
  error => {
    Promise.reject(error);
  }
);

api.interceptors.response.use((response) => response, async (error) => {
  const originalRequest = error.config;

  if (error.response.status === 401 && originalRequest.url ===
    process.env.VUE_APP_BACK_URL + '/auth/token/refresh') {
    router.push('/login');
    return Promise.reject(error);
  }

  if (error.response.status === 401 && !originalRequest._retry) {
    originalRequest._retry = true;
    const res = await api.post('/auth/token/refresh', { token: refreshToken });
    if (res.status === 201) {
      refreshToken = res.data.refreshToken;
      accessToken = res.data.accessToken;

      return api(originalRequest);
    } else {
      router.push('/login');

      return Promise.reject(error);
    }
  }
  return Promise.reject(error);
});

export const http = {
  setAccessToken,
  setRefreshToken,
  ...api
}

export const rpcClient = axios.create({
  baseURL: process.env.VUE_APP_RPC_URL
});

export const powClient = axios.create({
  baseURL: process.env.VUE_APP_POW_URL
});