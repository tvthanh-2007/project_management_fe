import type { UserState } from './interface'
import type { UserActionTypes } from './actions'
import { SET_USER_SUCCESS, SET_USER_FAIL } from './actionTypes'

const initialState: UserState = {
  user: null,
  error: null
}

export const UserReducer = (state = initialState, action: UserActionTypes): UserState => {
  switch (action.type) {
    case SET_USER_SUCCESS:
      return { ...state, user: action.payload }
    case SET_USER_FAIL:
      return { ...state, error: action.payload }
    default:
      return state
  }
}
