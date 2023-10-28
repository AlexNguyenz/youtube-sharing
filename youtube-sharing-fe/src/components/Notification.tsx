import React, { useState } from "react";
import { BellOutlined } from "@ant-design/icons";
import { Badge, Button, Flex, Popover } from "antd";
import { styled } from "styled-components";
import { useRecoilState, useSetRecoilState } from "recoil";
import notificationState from "~/stores/notification";
import loadingState from "~/stores/loading";
import { useLocation, useNavigate } from "react-router-dom";
import { ROUTES } from "~/constant/route";
import { scrollToTop } from "~/utils";

export interface INotificationItem {
  title: string;
  email: string;
}

const Notification = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [notification, setNotification] = useRecoilState(notificationState);
  const setLoading = useSetRecoilState(loadingState);
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const handleClickItemNotification = () => {
    if (pathname === ROUTES.HOME) {
      scrollToTop();
    } else {
      navigate(ROUTES.HOME);
    }
    setLoading(true);
    setOpen(false);
  };

  const listNotification = () => {
    return (
      <NotificationContainer vertical gap={"10px"}>
        {notification.notifications.map((item, index) => (
          <NotificationItem key={index} onClick={handleClickItemNotification}>
            <Title>{item.title}</Title>
            <Email>{`Shared by ${item.email}`}</Email>
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
        data-cy="badge"
        dot={notification.state}
        style={{ width: "10px", height: "10px", backgroundColor: "#1677ff" }}
      >
        <Button data-cy="notification" icon={<BellOutlined />} />
      </Badge>
    </Popover>
  );
};

export default Notification;

const NotificationContainer = styled(Flex)`
  max-height: 500px;
  overflow: auto;
  overflow-x: hidden;
  max-width: 300px;
  width: 300px;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    -webkit-appearance: none;
  }
`;

const NotificationItem = styled.div`
  cursor: pointer;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  transition: all 0.2s ease;

  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
`;

const Title = styled.p`
  font-weight: 700;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;
const Email = styled.p`
  font-weight: 500;
  color: gray;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;
