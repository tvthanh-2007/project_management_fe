import instance from "../utils/axiosInstance";

export const verifyInvitation = async (payload: {email: string, token: string}) => {
  const res = await instance.post(`/invitations/accept`, payload)
  return res.data;
}
