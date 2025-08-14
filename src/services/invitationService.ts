import instance from "../utils/axiosInstance";

export const verifyInvitation = async (id: number, payload: {email: string, token: string}) => {
  const res = await instance.post(`/projects/${id}/invitations/accept`, payload)
  return res.data;
}
