export interface UserState {
  error: string | null,
  user: {
    id: number,
    name: string,
    role: number,
    username: string,
    email: string
  } | null,
}
