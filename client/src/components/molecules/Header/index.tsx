import { FC } from 'react'
import { useNavigate } from 'react-router-dom'
import { CURRENT_USER, SESSION_KEY } from '@/constants'
import { authStore } from '@/store'
import { removeItemFromLocalStorage } from '@/utils'
import { useSnapshot } from 'valtio'
import { useQueryClient } from '@tanstack/react-query'

export const Header: FC = () => {
  const navigate = useNavigate()
  const { user } = useSnapshot(authStore)
  const queryClient = useQueryClient()

  const handleLogout = () => {
    removeItemFromLocalStorage(SESSION_KEY)
    removeItemFromLocalStorage(CURRENT_USER)
    navigate('/login')
    authStore.setUser(null)
    authStore.setLogout()
    queryClient.clear()
  }

  return (
    <header className="bg-gray-800 text-white p-5 flex justify-between border-b border-solid border-gray-600">
      <div className="flex items-center">
        <img
          src="/vite.svg"
          alt="logo"
          height={50}
          width={40}
          className="mr-4"
        />
        <h1 className="text-xl font-semibold">Chat Application</h1>
      </div>
      <div className="flex items-center">
        <p className="mr-4 font-semibold">@{user?.username}</p>
        <button
          type="button"
          onClick={handleLogout}
          className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
        >
          Logout
        </button>
      </div>
    </header>
  )
}
