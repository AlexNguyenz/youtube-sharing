import axios from "axios";
import { STORAGE_KEY } from "~/constant/localStorage";
import { getLocalStorage } from "~/utils/storage";

const TIMEOUT = 25 * 1000;

const isDEV = process.env.MODE === "development";
const BASE_URL = isDEV ? process.env.BASE_URL_LOCALHOST : process.env.BASE_URL;

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
  const accessToken = getLocalStorage(STORAGE_KEY.ACCESS_TOKEN);
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

requestWithoutToken.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.reject(error);
  }
);

export { request, requestWithoutToken };
