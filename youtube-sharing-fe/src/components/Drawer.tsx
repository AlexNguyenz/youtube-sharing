import React, { useState } from "react";
import { Button, Drawer as DrawerAntd } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import Form from "./Form";

const Drawer: React.FC = () => {
  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button icon={<MenuOutlined />} onClick={showDrawer} />
      <DrawerAntd
        width={"100vw"}
        title="Đăng kí - Đăng nhập"
        placement="right"
        onClose={onClose}
        open={open}
      >
        <Form />
      </DrawerAntd>
    </>
  );
};

export default Drawer;
