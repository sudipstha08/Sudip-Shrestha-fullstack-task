import React, { ComponentType, ReactNode, useEffect } from 'react'
import { useNavigate } from 'react-router'
import { Loader } from '@/components'
import { authStore } from 'src/store'
import { useSnapshot } from 'valtio'

export const PublicRoute = (PublicComponent: ComponentType) => {
  function RestrictedComponent({ children }: { children: ReactNode }) {
    const { loggedIn } = useSnapshot(authStore)
    const navigate = useNavigate()

    useEffect(() => {
      if (loggedIn) {
        navigate('/')
      } else {
        navigate('/login')
        authStore.setLogout()
      }
    }, [loggedIn, navigate])

    if (loggedIn) {
      return <Loader />
    }

    return <>{!loggedIn && children}</>
  }

  return class Higher extends React.Component {
    render() {
      return (
        <RestrictedComponent>
          <PublicComponent {...this.props} />
        </RestrictedComponent>
      )
    }
  }
}
