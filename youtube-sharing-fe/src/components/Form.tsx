import React, { useState } from "react";
import { Button, Flex, Grid, Input } from "antd";
import { Controller, useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import authState, { IAuth } from "~/stores/user";
import { REGEX } from "~/constant/regex";
import { loginApi, registerApi } from "~/apis/auth/auth";
import { saveStorage } from "~/utils/storage";
import toastState, { IToast } from "~/stores/toast";
import { MESSAGE } from "~/constant/message";

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
  const [loading, setLoading] = useState<boolean>(false);
  const { handleSubmit, control } = useForm<FormInput>();
  const setAuth = useSetRecoilState<IAuth>(authState);
  const setToast = useSetRecoilState<IToast>(toastState);

  const handleLogin = async (data: FormInput) => {
    try {
      setLoading(true);
      const body = {
        email: data.email,
        password: data.password,
      };
      const response = await loginApi(body);
      setAuth((preState) => ({
        ...preState,
        email: response.user.email,
        accessToken: response.accessToken,
      }));
      saveStorage({
        email: response.user.email,
        accessToken: response.accessToken,
      });
      setToast({ type: "success", message: MESSAGE.SUCCESS.LOGIN });
    } catch (error: any) {
      setToast({ type: "error", message: error.message });
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (data: FormInput) => {
    try {
      setLoading(true);

      const body = {
        email: data.email,
        password: data.password,
      };
      const response = await registerApi(body);
      setAuth((preState) => ({
        ...preState,
        email: response.user.email,
        accessToken: response.accessToken,
      }));
      saveStorage({
        email: response.user.email,
        accessToken: response.accessToken,
      });
      setToast({ type: "success", message: MESSAGE.SUCCESS.REGISTER });
    } catch (error: any) {
      setToast({ type: "error", message: error.message });
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = (data: FormInput) => {
    if (buttonType === "login") {
      handleLogin(data);
    } else {
      handleRegister(data);
    }
    onClose?.();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Flex gap="10px" vertical={isMobile ? true : false}>
        <Controller
          name="email"
          control={control}
          rules={{
            required: true,
            pattern: { value: REGEX.EMAIL, message: "" },
          }}
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
          rules={{ required: true, minLength: 8 }}
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
          loading={buttonType === "login" && loading}
        >
          Login
        </Button>
        <Button
          htmlType="submit"
          onClick={() => setButtonType("register")}
          loading={buttonType === "register" && loading}
        >
          Register
        </Button>
      </Flex>
    </form>
  );
};

export default Form;
