// redux/rootReducer.ts
import { combineReducers } from 'redux'
import { AuthReducer } from './auth/reducer'
import { UserReducer } from './user/reducer'

export const rootReducer = combineReducers({
  auth: AuthReducer,
  user: UserReducer,
})

export type RootState = ReturnType<typeof rootReducer>
