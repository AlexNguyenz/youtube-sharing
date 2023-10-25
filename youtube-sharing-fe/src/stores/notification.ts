import { atom } from "recoil";
import { INotificationItem } from "~/components/Notification";

export interface INotification {
  state: boolean;
  notifications: Array<INotificationItem>;
}

const notificationState = atom<INotification>({
  key: "notificationState",
  default: {
    state: false,
    notifications: [],
  },
});

export default notificationState;
