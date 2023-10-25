import { STORAGE_KEY } from "~/constant/localStorage";
import { IAuth } from "~/stores/user";

export const saveStorage = (data: IAuth) => {
  localStorage.setItem(STORAGE_KEY.EMAIL, data.email);
  localStorage.setItem(STORAGE_KEY.ACCESS_TOKEN, data.accessToken);
};

export const getLocalStorage = (key: STORAGE_KEY) => {
  return localStorage.getItem(key);
};

export const clearStorage = () => {
  localStorage.clear();
};
