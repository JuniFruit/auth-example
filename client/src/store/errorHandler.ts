import { IErrorInfo } from "@/types/error.types";

export const errorHandler = (
  err: any,
  callback: (msg: string, errors?: IErrorInfo[]) => void
) => {
  if (err.isAxiosError) {
    if (err.response) {
      const errorInfo: IErrorInfo[] = [
        ...(err.response.data?.errors?.length ? err.response.data.errors : []),
      ];
      return callback(err?.response.data?.message, errorInfo);
    } else {
      return callback("Network Error");
    }
  }
  callback("Something went wrong! Try to reload the page.");
};
