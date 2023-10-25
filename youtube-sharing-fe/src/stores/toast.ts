import { atom } from "recoil";
import { NotificationType } from "~/components/Toast";

export interface IToast {
  type: NotificationType;
  message: string;
}

const toastState = atom<IToast>({
  key: "toastState",
  default: {
    type: "info",
    message: "",
  },
});

export default toastState;
