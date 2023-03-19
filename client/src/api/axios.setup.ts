import { IAuth } from "@/types/auth.types";
import axios, {
  AxiosError,
  AxiosRequestConfig,
  InternalAxiosRequestConfig,
} from "axios";

export const APP_URL =
  process.env.VUE_APP_APPLICATION_URL || "http://localhost:3000/";

export const api = axios.create({
  withCredentials: true,
  baseURL: APP_URL,
});

api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem(
    "access_token"
  )}`;
  return config;
});

api.interceptors.response.use(
  config => {
    return config;
  },
  async error => {
    const origRequest = error.config;
    if (
      error.response.status === 401 &&
      error.config &&
      !error.config._isRetry
    ) {
      try {
        origRequest._isRetry = true;
        const res = await axios.get<IAuth>(`${APP_URL}api/refresh`, {
          withCredentials: true,
        });
        localStorage.setItem("access_token", res.data.accessToken);
        return api.request(origRequest);
      } catch (error) {
        console.error(error);
      }
    }
    throw error;
  }
);
