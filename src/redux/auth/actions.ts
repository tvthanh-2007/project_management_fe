import { LOGIN, LOGOUT } from './actionTypes'
import type { AuthState } from './interface'

export interface loginAction {
  type: string,
  payload: {
    user: AuthState['user']
    token: string
    refresh: string
  }
}

export interface logoutAction {
  type: typeof LOGOUT
}

export const login = (user: AuthState['user'], token: string, refresh: string): loginAction => ({
  type: LOGIN,
  payload: { user, token, refresh },
})

export const logout = (): logoutAction => ({
  type: LOGOUT,
})

export type AuthActionTypes = loginAction | logoutAction
