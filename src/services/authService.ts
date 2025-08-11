import instance from "../utils/axiosInstance";

export const loginApi = async (username: string, password: string) => {
  const res = await instance.post("/login", { username, password })
  return res.data;
}

export const logoutApi = async () => {
  const res = await instance.delete("/logout")
  return res.data;
}
