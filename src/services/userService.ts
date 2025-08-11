import instance from "../utils/axiosInstance";

export const getUsersApi = async () => {
  const res = await instance.get("/users")
  return res.data;
}

export const getUserApi = async () => {
  const res = await instance.get("/profile")
  return res.data;
}
