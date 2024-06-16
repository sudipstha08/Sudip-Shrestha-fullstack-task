import { useEffect } from 'react'
import { useSnapshot } from 'valtio'
import { CURRENT_USER, SESSION_KEY } from 'src/constants'
import { authStore } from 'src/store'
import { getItemFromLocalStorage, removeItemFromLocalStorage } from 'src/utils'
import { User } from '@/interfaces'

const token = getItemFromLocalStorage(SESSION_KEY)
const user = getItemFromLocalStorage(CURRENT_USER)

export const useClientAuthentication = () => {
  const { setLoggedIn } = useSnapshot(authStore)

  useEffect(() => {
    if (token) {
      try {
        authStore.setLoggedIn()
        authStore.setUser(user as User)
      } catch (error) {
        authStore.setLogout()
        removeItemFromLocalStorage(SESSION_KEY)
      }
    } else {
      authStore.setLogout()
    }
  }, [setLoggedIn])

  return { token }
}
