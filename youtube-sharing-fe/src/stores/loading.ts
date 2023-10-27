import { atom } from "recoil";

const loadingState = atom<boolean>({
  key: "loadingState",
  default: true,
});

export default loadingState;
