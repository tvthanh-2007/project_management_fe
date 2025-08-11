import type { RootState } from '../rootReducer'

export const selectUser = (state: RootState) => state.user.user
export const selectError = (state: RootState) => state.user.error
