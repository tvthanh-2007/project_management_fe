export interface AuthState {
  token: string | null,
  refresh: string | null,
  error: any | null,
  user: {
    id: number,
    name: string,
    role: number,
    username: string
  } | null
}
