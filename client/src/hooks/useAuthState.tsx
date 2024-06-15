import { useEffect } from 'react'
import { useSnapshot } from 'valtio'
import { SESSION_KEY } from 'src/constants'
import { authStore } from 'src/store'
import { getItemFromLocalStorage, removeItemFromLocalStorage } from 'src/utils'

const token = getItemFromLocalStorage(SESSION_KEY)

export const useClientAuthentication = () => {
  const { setLoggedIn } = useSnapshot(authStore)

  useEffect(() => {
    if (token) {
      try {
        authStore.setLoggedIn()
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
