import { proxy } from 'valtio'
import { User, IAuthStore } from '../interfaces'

export const authStore = proxy<IAuthStore>({
  loggedIn: false,
  user: null,
  tokenFetching: false,
  setUser(user: User | null) {
    this.user = user
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
