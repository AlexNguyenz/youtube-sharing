import { URL } from "~/constant/url";
import { requestWithoutToken } from "../config";
import { axiosErrorHandler } from "../errorHandler";
import { IResponseListVideo, IVideo } from "./type";
import { AxiosResponse } from "axios";

export const listVideoApi = async () => {
  try {
    const response = await requestWithoutToken.get<IResponseListVideo>(
      URL.LIST_VIDEO
    );
    return response.data;
  } catch (error) {
    axiosErrorHandler(error);
  }
};

export const shareVideoApi = async (url: string) => {
  try {
    const response = await requestWithoutToken.post<
      string,
      AxiosResponse<IVideo>
    >(URL.LIST_VIDEO, {
      url,
    });
    return response.data;
  } catch (error) {
    axiosErrorHandler(error);
  }
};
