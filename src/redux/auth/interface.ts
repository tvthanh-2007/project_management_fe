export interface AuthState {
  token: string | null,
  refresh: string | null,
  error: string | null,
  user: {
    id: number,
    name: string,
    role: number,
    username: string
  } | null
}
