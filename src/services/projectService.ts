import type { VisibilityKey } from "../constants/project";
import type { CreateProjectPayload, ProjectInterface } from "../interface/project";
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

export const inviteMemberApi = async (id: number, payload: {email: string, role: VisibilityKey}) => {
  const res = await instance.post(`/projects/${id}/invitations`, payload)
  return res.data;
}

export const updateProjectApi = async (payload: { project: ProjectInterface }) => {
  const res = await instance.put(`/projects/${payload.project.id}`, payload)
  return res.data;
}

export const deleteProjectApi = async (id: number) => {
  const res = await instance.delete(`/projects/${id}`, {})
  return res.data;
}

export const createProjectApi = async (payload: { project: CreateProjectPayload }) => {
  const res = await instance.post(`/projects`, payload)
  return res.data;
}
