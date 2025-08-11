import instance from "../utils/axiosInstance";

export const getUsersApi = async () => {
  const res = await instance.get("/users")
  return res.data;
}
