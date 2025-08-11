import axios from "axios";
import { API_BASE_URL } from "../config/api";

const instance = axios.create({
  baseURL: API_BASE_URL,
});

instance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

instance.interceptors.response.use(
  (response) => {
    console.log('Response data:', response.data)
    return response
  },
  (error) => {
    const originalRequest = error.config

    // code handle
    if (originalRequest.url?.includes('/login')) {
      return Promise.reject(error)
    }

    // token expired
    if (error.response?.status === 401) {
      window.location.href = '/401';
    }
    return Promise.reject(error)
  }
)

export default instance;
