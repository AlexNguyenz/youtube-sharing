import { AxiosError } from "axios";

interface IError {
  message: string;
}

export const axiosErrorHandler = (err: unknown) => {
  const error = err as AxiosError<IError>;
  throw new Error(error.response?.data?.message || error.message);
};
