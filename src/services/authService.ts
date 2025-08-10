import axios from "axios";
import { API_BASE_URL } from "../config/api";

export const loginApi = async (username: string, password: string) => {
  const res = await axios.post(`${API_BASE_URL}/login`, { username, password })
  return res.data;
}
