import instance from "../utils/axiosInstance";

export const getProjectsApi = async () => {
  const res = await instance.get(`/projects`)
  return res.data;
}

export const getProjectApi = async (id: number) => {
  const res = await instance.get(`/projects/${id}`)
  return res.data;
}

export const getMemberProjectsApi = async (id: number) => {
  const res = await instance.get(`/projects/${id}/joined_members`)
  return res.data;
}

export const inviteMemberApi = async (id: number) => {
  const res = await instance.post(`/projects/${id}/invitations`)
  return res.data;
}

