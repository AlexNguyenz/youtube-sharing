import React, { useState } from "react";
import { Button, Flex, Grid, Input } from "antd";
import { Controller, FieldErrors, useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import authState, { IAuth } from "~/stores/user";
import { REGEX } from "~/constant/regex";
import { loginApi, registerApi } from "~/apis/auth/auth";
import { saveStorage } from "~/utils/storage";
import toastState, { IToast } from "~/stores/toast";
import { MESSAGE } from "~/constant/message";
import { IAuthResponse } from "~/apis/auth/types";

const { useBreakpoint } = Grid;

type ButtonType = "login" | "register";

type FormInput = {
  email: string;
  password: string;
};

interface Props {
  onClose?: () => void;
}

const Form: React.FC<Props> = ({ onClose }) => {
  const screens = useBreakpoint();
  const isMobile = screens.xs;
  const { handleSubmit, control } = useForm<FormInput>();
  const setAuth = useSetRecoilState<IAuth>(authState);
  const setToast = useSetRecoilState<IToast>(toastState);
  const [buttonType, setButtonType] = useState<ButtonType>("login");
  const [loading, setLoading] = useState<boolean>(false);

  const saveUser = (response: IAuthResponse) => {
    setAuth(() => ({
      email: response.user.email,
      accessToken: response.accessToken,
    }));
    saveStorage({
      email: response.user.email,
      accessToken: response.accessToken,
    });
  };

  const handleLogin = async (data: FormInput) => {
    try {
      setButtonType("login");
      setLoading(true);
      const body = {
        email: data.email,
        password: data.password,
      };
      const response = await loginApi(body);
      saveUser(response);
      setToast({ type: "success", message: MESSAGE.SUCCESS.LOGIN });
    } catch (error: any) {
      setToast({ type: "error", message: error.message });
    } finally {
      setLoading(false);
      onClose?.();
    }
  };

  const handleRegister = async (data: FormInput) => {
    try {
      setButtonType("register");
      setLoading(true);
      const body = {
        email: data.email,
        password: data.password,
      };
      const response = await registerApi(body);
      saveUser(response);
      setToast({ type: "success", message: MESSAGE.SUCCESS.REGISTER });
    } catch (error: any) {
      setToast({ type: "error", message: error.message });
    } finally {
      setLoading(false);
      onClose?.();
    }
  };

  const handleError = (errors: FieldErrors<FormInput>) => {
    if (errors.email && errors.password) {
      return setToast({ type: "error", message: MESSAGE.ERROR.EMAIL_PASSWORD });
    }
    if (errors.email) {
      return setToast({ type: "error", message: MESSAGE.ERROR.EMAIL });
    }
    if (errors.password) {
      return setToast({ type: "error", message: MESSAGE.ERROR.PASSWORD });
    }
  };

  return (
    <form>
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
              data-cy="email"
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
              data-cy="password"
              placeholder="Password"
              {...field}
              style={{ border: `${error ? "1px solid red" : "none"}` }}
            />
          )}
        />

        <Button
          data-cy="login"
          type="primary"
          loading={buttonType === "login" && loading}
          onClick={handleSubmit((data) => handleLogin(data), handleError)}
        >
          Login
        </Button>
        <Button
          data-cy="register"
          loading={buttonType === "register" && loading}
          onClick={handleSubmit((data) => handleRegister(data), handleError)}
        >
          Register
        </Button>
      </Flex>
    </form>
  );
};

export default Form;
