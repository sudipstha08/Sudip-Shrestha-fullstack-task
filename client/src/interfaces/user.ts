export interface User {
  id: string
  username: string
  password: string
  token?: string
}

export interface IAuthStore {
  loggedIn: boolean
  user: User | null
  tokenFetching: boolean
  setLoggedIn: () => void
  setLogout: () => void
  setUser: (user: User | null) => void
  setTokenFetching: (status: boolean) => void
}
