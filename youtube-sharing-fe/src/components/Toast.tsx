import React, { useEffect } from "react";
import { notification } from "antd";
import { useRecoilValue } from "recoil";
import toastState from "~/stores/toast";

export type NotificationType = "success" | "info" | "warning" | "error";

const Toast: React.FC = () => {
  const [api, contextHolder] = notification.useNotification();
  const { type, message } = useRecoilValue(toastState);

  const openNotificationWithIcon = () => {
    api[type]({
      message: message,
    });
  };

  useEffect(() => {
    if (message) {
      openNotificationWithIcon();
    }
  }, [type, message]);

  return <>{contextHolder}</>;
};

export default Toast;
