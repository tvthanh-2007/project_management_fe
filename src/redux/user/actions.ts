import { SET_USER_SUCCESS, SET_USER_FAIL, REMOVE_USER_INFO } from './actionTypes'
import type { UserState } from './interface'

export interface LoadUserSuccessAction {
  type: typeof SET_USER_SUCCESS,
  payload: UserState['user']
}

export interface LoginUserFailureAction {
  type: typeof SET_USER_FAIL,
  payload: UserState['error']
}

export interface RemoveUserInfoAction {
  type: typeof REMOVE_USER_INFO
}

export const loadUserSuccess = (user: UserState['user']): LoadUserSuccessAction => ({
  type: SET_USER_SUCCESS,
  payload: user
})

export const loadUserFailure = (error: UserState['error']): LoginUserFailureAction => ({
  type: SET_USER_FAIL,
  payload: error
})

export const removeUserInfo = (): RemoveUserInfoAction => ({
  type: REMOVE_USER_INFO
})

export type UserActionTypes = LoadUserSuccessAction | LoginUserFailureAction | RemoveUserInfoAction
