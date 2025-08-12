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

instance.interceptors.response.use(
  (res) => res,
  (error) => {
    const originalRequest = error.config

    // code handle
    if (originalRequest.url?.includes('/login')) {
      return Promise.reject(error)
    }

    // token expired
    if (error.response?.status === 401) {
      localStorage.removeItem('token')
      localStorage.removeItem('refresh')

      if (globalNavigate) {
        globalNavigate("/login");
      } else {
        window.location.href = "/login";
      }
    }

    if (error.response?.status === 403) window.location.href = "/403";
    if (error.response?.status === 404) window.location.href = "/404";
    if (error.response?.status === 500) window.location.href = "/500";

    return Promise.reject(error)
  }
)

export default instance;
