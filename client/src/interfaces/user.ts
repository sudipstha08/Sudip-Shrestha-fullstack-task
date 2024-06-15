export interface User {
  id: string
  username: string
  password: string
}

export interface IAuthStore {
  loggedIn: boolean
  dbUser: User | null
  tokenFetching: boolean
  setLoggedIn: () => void
  setLogout: () => void
  setUser: (user: User | null) => void
  setTokenFetching: (status: boolean) => void
}
