import axios, {
  AxiosError,
  AxiosRequestConfig,
  InternalAxiosRequestConfig,
} from "axios";

const APP_URL = process.env.VUE_APP_APP_URL;

export const api = axios.create({
  withCredentials: true,
  baseURL: APP_URL,
});

api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  config.headers.Authorization = localStorage.getItem("access_token");
  return config;
});

api.interceptors.response.use(
  config => {
    return config;
  },
  error => {}
);
