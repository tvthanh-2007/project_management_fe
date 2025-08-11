import { LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT } from './actionTypes'
import type { AuthState } from './interface'

export interface LoginSuccessAction {
  type: typeof LOGIN_SUCCESS,
  payload: {
    user: AuthState['user'],
    token: string,
    refresh: string
  }
}

export interface LoginFailureAction {
  type: typeof LOGIN_FAILURE,
  payload: AuthState['error']
}

export interface LogoutAction {
  type: typeof LOGOUT
}

// export const login = (username: string, password: string): LoginAction => ()
export const loginSuccess = (user: AuthState['user'], token: string, refresh: string): LoginSuccessAction => ({
  type: LOGIN_SUCCESS,
  payload: { user, token, refresh }
})

export const loginFailure = (error: AuthState['error']): LoginFailureAction => ({
  type: LOGIN_FAILURE,
  payload: error
})

export const logout = (): LogoutAction => ({
  type: LOGOUT,
})

export type AuthActionTypes = LoginSuccessAction | LoginFailureAction | LogoutAction
