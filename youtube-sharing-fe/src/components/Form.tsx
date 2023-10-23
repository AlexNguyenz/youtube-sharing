import React, { useState } from "react";
import { Button, Flex, Grid, Input } from "antd";
import { Controller, useForm } from "react-hook-form";
import { STORAGE_KEY } from "~/constant/localStorage";
import { useSetRecoilState } from "recoil";
import authState, { IAuth } from "~/stores/user";

const { useBreakpoint } = Grid;

type FormInput = {
  email: string;
  password: string;
};

type ButtonType = "login" | "register";

interface Props {
  onClose?: () => void;
}

const Form: React.FC<Props> = ({ onClose }) => {
  const screens = useBreakpoint();
  const isMobile = screens.xs;
  const [buttonType, setButtonType] = useState<ButtonType | null>(null);
  const { handleSubmit, control } = useForm<FormInput>();
  const setAuth = useSetRecoilState<IAuth>(authState);

  const onSubmit = (data: FormInput) => {
    console.log(buttonType);
    localStorage.setItem(STORAGE_KEY.EMAIL, data.email);
    setAuth((preState) => ({ ...preState, email: data.email }));
    onClose?.();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Flex gap="10px" vertical={isMobile ? true : false}>
        <Controller
          name="email"
          control={control}
          rules={{ required: true }}
          render={({ field, fieldState: { error } }) => (
            <Input
              style={{ border: `${error ? "1px solid red" : "none"}` }}
              placeholder="Email"
              {...field}
            />
          )}
        />

        <Controller
          name="password"
          control={control}
          rules={{ required: true }}
          render={({ field, fieldState: { error } }) => (
            <Input.Password
              placeholder="Password"
              {...field}
              style={{ border: `${error ? "1px solid red" : "none"}` }}
            />
          )}
        />

        <Button
          type="primary"
          htmlType="submit"
          onClick={() => setButtonType("login")}
        >
          Login
        </Button>
        <Button htmlType="submit" onClick={() => setButtonType("register")}>
          Register
        </Button>
      </Flex>
    </form>
  );
};

export default Form;
