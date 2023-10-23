import axios from "axios";
import { STORAGE_KEY } from "~/constant/localStorage";

const TIMEOUT = 25 * 1000;

const isDEV = import.meta.env.DEV;
const BASE_URL = isDEV
  ? import.meta.env.VITE_BASE_URL_LOCALHOST
  : import.meta.env.VITE_BASE_URL;

const instance = axios.create({
  baseURL: BASE_URL,
  timeout: TIMEOUT,
  headers: {
    "Content-Type": "application/json",
  },
});

const requestWithoutToken = instance;
const request = instance;

request.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem(STORAGE_KEY.ACCESS_TOKEN);
  if (accessToken) {
    config.headers.authorization = `Bearer ${accessToken}`;
  }
  return config;
});

request.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.reject(error);
  }
);

export { request, requestWithoutToken };
