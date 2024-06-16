import React, { ComponentType, ReactNode, useEffect } from 'react'
import { useNavigate } from 'react-router'
import { useSnapshot } from 'valtio'
import { authStore } from '@/store'
import { SESSION_KEY } from '@/constants'
import { getItemFromLocalStorage } from '@/utils'
import { Loader } from '@/components'

const token = getItemFromLocalStorage(SESSION_KEY)

export const PrivateRoute = (AuthComponent: ComponentType) => {
  function PrivateComponent({ children }: { children: ReactNode }) {
    const navigate = useNavigate()
    const { loggedIn, tokenFetching } = useSnapshot(authStore)

    useEffect(() => {
      if (!loggedIn && !token) {
        navigate('/login')
      }
    }, [loggedIn, navigate])

    if (tokenFetching) {
      return <Loader />
    }

    return <>{loggedIn && children} </>
  }

  return class Higher extends React.Component {
    render() {
      return (
        <PrivateComponent>
          <AuthComponent {...this.props} />
        </PrivateComponent>
      )
    }
  }
}
