/* eslint-disable react-hooks/exhaustive-deps */
import { SOCKET_EVENT } from '@/constants'
import { authStore, useSocket } from '@/store'
import { FC, FormEvent, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useSnapshot } from 'valtio'
import { v4 as uuidv4 } from 'uuid'

interface IMessage {
  id: string
  senderUsername: string
  receiverUsername: string
  message: string
}

export const ChatSection: FC = () => {
  const { socket } = useSocket()
  const { user } = useSnapshot(authStore)
  const { state } = useLocation()
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState<IMessage[]>([])

  useEffect(() => {
    if (socket) {
      socket.emit(
        SOCKET_EVENT.START_CHAT,
        JSON.stringify({ username: state?.username }),
      )

      socket.on(SOCKET_EVENT.CHAT_STARTED, () => {})

      socket.on('incomingMessage', msg => {
        const parsedMessage = JSON.parse(msg)
        setMessages(prevMessages => [
          ...prevMessages,
          {
            id: uuidv4(),
            senderUsername: parsedMessage?.senderUsername as string,
            receiverUsername: parsedMessage?.receiverUsername,
            message: parsedMessage?.message,
          },
        ])
      })
    }
    return () => {
      socket?.off('incomingMessage')
    }
  }, [socket, state])

  const handleSendMessage = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!message) return
    socket?.emit(
      'newMessage',
      JSON.stringify({
        senderUsername: user?.username,
        receiverUsername: state?.username,
        message: message,
      }),
    )
    setMessages(prevMessages => [
      ...prevMessages,
      {
        id: uuidv4(),
        senderUsername: user?.username as string,
        receiverUsername: state?.username,
        message: message,
      },
    ])
    setMessage('')
  }

  return (
    <section className="flex flex-col w-[100%]">
      <div className="bg-gray-200 dark:bg-gray-800 flex-1 overflow-y-auto pt-2">
        <div className="px-4 py-2">
          {messages.map(message => (
            <div
              key={message.id}
              className={`flex flex-col ${message.senderUsername === user?.username ? 'items-end' : 'items-start'} mb-2`}
            >
              <div className="flex items-center mb-2">
                <img
                  className="w-8 h-8 rounded-full mr-2"
                  src={
                    message.senderUsername == user?.username
                      ? 'https://picsum.photos/200/300'
                      : 'https://randomuser.me/api/portraits/man/4.jpg'
                  }
                  alt="User1 avatar"
                  height={32}
                  width={32}
                />
                <div className="font-medium dark:text-white">
                  {message.senderUsername}
                </div>
              </div>
              <div
                className={`${message.senderUsername === user?.username ? 'bg-blue-500' : 'dark:bg-gray-700'}  dark:text-white rounded-lg p-2 shadow mb-2 max-w-sm`}
              >
                {message?.message}
              </div>
            </div>
          ))}
        </div>
      </div>

      <form onSubmit={handleSendMessage}>
        <div className="bg-gray-100 dark:bg-gray-900 px-4 py-2 border-t border-solid border-gray-600">
          <div className="flex items-center">
            <input
              className="w-full border rounded-full py-2 px-4 mr-2 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              type="text"
              value={message}
              onChange={e => setMessage(e.target.value)}
              placeholder="Type your message..."
            />
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-full"
              type="submit"
            >
              Send
            </button>
          </div>
        </div>
      </form>
    </section>
  )
}
