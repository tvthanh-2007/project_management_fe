import type { AuthState } from './interface'
import type { AuthActionTypes } from './actions'
import { LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT } from './actionTypes'

const initialState: AuthState = {
  token: null,
  refresh: null,
  error: null
}

export const AuthReducer = (state = initialState, action: AuthActionTypes): AuthState => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        token: action.payload.token,
        refresh: action.payload.refresh,
        error: null
      }
    case LOGIN_FAILURE:
      return { ...state, error: action.payload };
    case LOGOUT:
      return initialState
    default:
      return state
  }
}
