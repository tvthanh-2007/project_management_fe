import { PROJECT_DETAIL } from './actionTypes'
import type { ProjectState } from './interface'

export interface LoadProjectSuccessAction {
  type: typeof PROJECT_DETAIL,
  payload: ProjectState
}

export const loadProjectSuccess = (payload: ProjectState): LoadProjectSuccessAction => ({
  type: PROJECT_DETAIL,
  payload: payload
})

export type ProjectActionTypes = LoadProjectSuccessAction
