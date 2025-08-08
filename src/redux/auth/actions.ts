import { LOGIN, LOGOUT } from './actionTypes'
import type { AuthState } from './interface'

export interface LoginAction {
  type: string,
  payload: {
    user: AuthState['user']
    token: string
    refresh: string
  }
}

export interface LogoutAction {
  type: typeof LOGOUT
}

export const login = (user: AuthState['user'], token: string, refresh: string): LoginAction => ({
  type: LOGIN,
  payload: { user, token, refresh },
})

export const logout = (): LogoutAction => ({
  type: LOGOUT,
})

export type AuthActionTypes = LoginAction | LogoutAction
