import axios from "axios";
import { API_BASE_URL } from "../config/api";
import type { NavigateFunction } from "react-router-dom";

let globalNavigate: NavigateFunction | undefined;

export const setNavigate = (nav: NavigateFunction) => {
  globalNavigate = nav;
};

const instance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

instance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

const handleRedirectError = (status: number, defaultMsg: string, err: any) => {
  const msg = err.response?.data?.error || defaultMsg;
  sessionStorage.setItem(`msg${status}`, msg);
  window.location.href = `/${status}`;
};

instance.interceptors.response.use(
  (res) => res,
  (error) => {
    const originalRequest = error.config

    // code handle
    if (originalRequest.url?.includes('/login')) {
      return Promise.reject(error)
    }

    const status = error.response?.status;

    switch (status) {
      case 401:
        localStorage.removeItem("token");
        localStorage.removeItem("refresh");

        if (globalNavigate) {
          globalNavigate("/login");
        } else {
          window.location.href = "/login";
        }
        break;
      case 403:
        handleRedirectError(403, "Forbidden", error);
        break;
      case 404:
        handleRedirectError(404, "Not Found", error);
        break;
      case 500:
        handleRedirectError(500, "Internal server error", error);
        break;
      default:
        break;
    }

    return Promise.reject(error)
  }
)

export default instance;
