import type { RootState } from '../rootReducer'

export const selectAuth = (state: RootState) => state.auth
export const selectUser = (state: RootState) => state.auth.user
export const selectToken = (state: RootState) => state.auth.token
export const selectRefresh = (state: RootState) => state.auth.refresh
export const selectAuthError = (state: RootState) => state.auth.error
