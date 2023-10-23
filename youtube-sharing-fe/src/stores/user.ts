import { atom } from "recoil";
import { STORAGE_KEY } from "~/constant/localStorage";

export interface IAuth {
  email: string;
  accessToken: string;
}

const authState = atom<IAuth>({
  key: "authState",
  default: {
    email: localStorage.getItem(STORAGE_KEY.EMAIL) || "",
    accessToken: localStorage.getItem(STORAGE_KEY.ACCESS_TOKEN) || "",
  },
});

export default authState;
