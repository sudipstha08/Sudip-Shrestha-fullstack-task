import React, { useEffect, useRef, useState } from 'react'
import { Socket, connect } from 'socket.io-client'
import { useSnapshot } from 'valtio'
import { createCtx } from './createCtx'
import { authStore } from '../authStore'
import { SOCKET_EVENT } from '@/constants'

interface SocketContext {
  socket: Socket | null
  setSocket: (socket: Socket | null) => void
  isLoading: boolean
  setIsLoading?: (isLoading: boolean) => void
}

const [useContext, CtxProvider] = createCtx<SocketContext>()

type Props = {
  children: React.ReactNode
}

// eslint-disable-next-line react-refresh/only-export-components
export const useSocket = useContext
let newSocket: Socket | undefined

export const SocketContextProvider = ({ children }: Props) => {
  const [socket, setSocket] = useState<Socket | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const { user } = useSnapshot(authStore)
  const isMounted = useRef(false)

  useEffect(() => {
    const onConnect = () => {
      setIsLoading(false)
    }

    const onConnectError = () => {
      newSocket!.io.opts.transports = ['polling', 'websocket']
    }

    newSocket = connect(`http://localhost:9000`!, {
      transports: ['websocket', 'polling'],
      autoConnect: true,
      // extraHeaders: {
      //   token: user?.token,
      // },
      // query: {
      //   token: user?.token,
      // },
    })

    setSocket(newSocket)
    if (newSocket) {
      newSocket.on(SOCKET_EVENT.CONNECT, onConnect)
      newSocket.on(SOCKET_EVENT.CONNECT_ERROR, onConnectError)
    }
    return () => {
      if (newSocket) {
        newSocket.disconnect()
        // newSocket?.off(SOCKET_EVENT.CONNECT, onConnect)
        // newSocket?.off(SOCKET_EVENT.CONNECT_ERROR, onConnectError)
        isMounted.current = true
      }
    }
  }, [user?.token])

  return (
    <CtxProvider
      value={{
        socket,
        setSocket,
        isLoading,
        setIsLoading,
      }}
    >
      {children}
    </CtxProvider>
  )
}
