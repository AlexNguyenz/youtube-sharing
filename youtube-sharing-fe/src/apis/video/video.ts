import { URL } from "~/constant/url";
import { request, requestWithoutToken } from "../config";
import { axiosErrorHandler } from "../errorHandler";
import { IRequestShareVideo, IResponseListVideo, IVideo } from "./type";
import { AxiosResponse } from "axios";

export const listVideoApi = async () => {
  try {
    const response = await requestWithoutToken.get<IResponseListVideo>(
      URL.LIST_VIDEO
    );
    return response.data;
  } catch (error) {
    return axiosErrorHandler(error);
  }
};

export const shareVideoApi = async (body: IRequestShareVideo) => {
  try {
    const response = await request.post<
      IRequestShareVideo,
      AxiosResponse<IVideo>
    >(URL.SHARE_VIDEO, body);
    return response.data;
  } catch (error) {
    return axiosErrorHandler(error);
  }
};
