import { proxy } from 'valtio'
import { User, IAuthStore } from '../interfaces'

export const authStore = proxy<IAuthStore>({
  loggedIn: false,
  dbUser: null,
  tokenFetching: false,
  setUser(user: User | null) {
    this.dbUser = user
  },
  setLoggedIn() {
    this.loggedIn = true
  },
  setLogout() {
    this.loggedIn = false
  },
  setTokenFetching(status) {
    this.tokenFetching = status
  },
})
