export interface AuthState {
  // isAuthenticated: boolean
  token: string | null
  refresh: string | null
  user: { id: number, name: string } | null
}
