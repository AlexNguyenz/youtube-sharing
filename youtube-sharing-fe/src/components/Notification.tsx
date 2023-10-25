import React, { useState } from "react";
import { BellOutlined } from "@ant-design/icons";
import { Badge, Button, Flex, Popover } from "antd";
import { styled } from "styled-components";
import { useRecoilState } from "recoil";
import notificationState from "~/stores/notification";

export interface INotificationItem {
  title: string;
  email: string;
}

const Notification = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [notification, setNotification] = useRecoilState(notificationState);

  const listNotification = () => {
    return (
      <NotificationContainer vertical gap={"10px"}>
        {notification.notifications.map((item, index) => (
          <NotificationItem key={index}>
            <p>{item.title}</p>
            <p>{`Shared by ${item.email}`}</p>
          </NotificationItem>
        ))}
      </NotificationContainer>
    );
  };

  const handleOpen = (visible: boolean) => {
    setOpen(visible);
    setNotification({ ...notification, state: false });
  };

  return (
    <Popover
      title="Notification"
      content={listNotification}
      trigger="click"
      open={open}
      onOpenChange={handleOpen}
    >
      <Badge
        dot={notification.state}
        style={{ width: "10px", height: "10px", backgroundColor: "#1677ff" }}
      >
        <Button icon={<BellOutlined />} />
      </Badge>
    </Popover>
  );
};

export default Notification;

const NotificationContainer = styled(Flex)`
  max-height: 500px;
  overflow: scroll;
  overflow-x: hidden;
  min-width: 300px;
`;

const NotificationItem = styled.div`
  cursor: pointer;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  transition: all 0.2s ease;

  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
`;
