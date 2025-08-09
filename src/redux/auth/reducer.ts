import type { AuthState } from './interface'
import type { AuthActionTypes } from './actions'
import { LOGIN, LOGOUT } from './actionTypes'

const initialState: AuthState = {
  token: null,
  refresh: null,
  user: null,
}

export const AuthReducer = (state = initialState, action: AuthActionTypes): AuthState => {
  switch (action.type) {
    case LOGIN:
      return {
        token: action.payload.token,
        refresh: action.payload.refresh,
        user: action.payload.user
      }
    case LOGOUT:
      return initialState
    default:
      return state
  }
}
