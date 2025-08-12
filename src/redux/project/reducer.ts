import type { ProjectState } from './interface'
import type { ProjectActionTypes } from './actions'
import { PROJECT_DETAIL } from './actionTypes'

const initialState: ProjectState = {
  id: null,
  name: null,
  description: null,
  visibility: null,
  user_id: null,
}

export const ProjectReducer = (state = initialState, action: ProjectActionTypes): ProjectState => {
  switch (action.type) {
    case PROJECT_DETAIL:
      return { ...state, ...action.payload }
    default:
      return state
  }
}
