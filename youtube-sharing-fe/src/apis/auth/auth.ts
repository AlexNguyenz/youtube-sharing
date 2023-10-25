import { requestWithoutToken } from "~/apis/config";
import { URL } from "~/constant/url";
import { IAuth, IAuthResponse } from "./types";
import { axiosErrorHandler } from "../errorHandler";
import { AxiosResponse } from "axios";

export const loginApi = async (body: IAuth) => {
  try {
    const response = await requestWithoutToken.post<
      IAuth,
      AxiosResponse<IAuthResponse>
    >(URL.LOGIN, body);
    return response.data;
  } catch (error) {
    return axiosErrorHandler(error);
  }
};

export const registerApi = async (body: IAuth) => {
  try {
    const response = await requestWithoutToken.post<IAuth, IAuthResponse>(
      URL.REGISTER,
      body
    );
    return response;
  } catch (error) {
    return axiosErrorHandler(error);
  }
};
