// redux/rootReducer.ts
import { combineReducers } from 'redux'
import { AuthReducer } from './auth/reducer'
import { UserReducer } from './user/reducer'
import { ProjectReducer } from './project/reducer'

export const rootReducer = combineReducers({
  auth: AuthReducer,
  user: UserReducer,
  project: ProjectReducer,
})

export type RootState = ReturnType<typeof rootReducer>
