import { atom } from "recoil";
import { STORAGE_KEY } from "~/constant/localStorage";
import { getLocalStorage } from "~/utils/storage";

export interface IAuth {
  email: string;
  accessToken: string;
}

const authState = atom<IAuth>({
  key: "authState",
  default: {
    email: getLocalStorage(STORAGE_KEY.EMAIL) || "",
    accessToken: getLocalStorage(STORAGE_KEY.ACCESS_TOKEN) || "",
  },
});

export default authState;
