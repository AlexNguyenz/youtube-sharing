import React, { useState } from "react";
import { Button, Drawer as DrawerAntd, Space } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import Form from "./Form";
import DrawerMenu from "./DrawerMenu";
import { useRecoilValue } from "recoil";
import authState, { IAuth } from "~/stores/user";
import Notification from "./Notification";

const Drawer: React.FC = () => {
  const { email, accessToken } = useRecoilValue<IAuth>(authState);
  const isLogged = email && accessToken;
  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Space>
        <Button data-cy="menu" icon={<MenuOutlined />} onClick={showDrawer} />
        {isLogged && <Notification />}
      </Space>
      <DrawerAntd
        width={"100vw"}
        title={email || "Login - Register"}
        placement="right"
        onClose={onClose}
        open={open}
      >
        {isLogged ? (
          <DrawerMenu onClose={onClose} />
        ) : (
          <Form onClose={onClose} />
        )}
      </DrawerAntd>
    </>
  );
};

export default Drawer;
