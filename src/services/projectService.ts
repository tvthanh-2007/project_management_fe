import instance from "../utils/axiosInstance";

export const getProjectsApi = async () => {
  const res = await instance.get(`/projects`)
  return res.data;
}
