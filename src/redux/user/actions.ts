import { SET_USER_SUCCESS, SET_USER_FAIL } from './actionTypes'
import type { UserState } from './interface'

export interface LoadUserSuccessAction {
  type: typeof SET_USER_SUCCESS,
  payload: UserState['user']
}

export interface LoginUserFailureAction {
  type: typeof SET_USER_FAIL,
  payload: UserState['error']
}

export const loadUserSuccess = (user: UserState['user']): LoadUserSuccessAction => ({
  type: SET_USER_SUCCESS,
  payload: user
})

export const loadUserFailure = (error: UserState['error']): LoginUserFailureAction => ({
  type: SET_USER_FAIL,
  payload: error
})

export type UserActionTypes = LoadUserSuccessAction | LoginUserFailureAction
