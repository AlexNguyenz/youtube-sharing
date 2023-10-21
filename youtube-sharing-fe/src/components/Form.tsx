import { Button, Flex, Grid, Input } from "antd";
import React, { useState } from "react";

const { useBreakpoint } = Grid;

const Form = () => {
  const screens = useBreakpoint();
  const isMobile = screens.xs;
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  return (
    <Flex gap="10px" vertical={isMobile ? true : false}>
      <Input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Input.Password
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button type="primary">Đăng nhập</Button>
      <Button>Đăng kí</Button>
    </Flex>
  );
};

export default Form;
