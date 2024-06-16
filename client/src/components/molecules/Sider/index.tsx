import { userService } from '@/services'
import { authStore } from '@/store'
import { useQuery } from '@tanstack/react-query'
import { FC } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSnapshot } from 'valtio'

const picSources = [
  'https://picsum.photos/200',
  'https://randomuser.me/api/portraits/women/2.jpg',
  'https://randomuser.me/api/portraits/women/4.jpg',
  'https://randomuser.me/api/portraits/man/4.jpg',
]

function generateRandomNumber() {
  return Math.floor(Math.random() * 5) + 1
}

export const Sider: FC = () => {
  const navigate = useNavigate()
  const { user } = useSnapshot(authStore)
  const { data } = useQuery({
    queryKey: ['fetchUsers'],
    queryFn: userService.fetchUsers,
  })

  return (
    <aside className="bg-gray-900 text-white w-[350px] h-full p-4 border-r border-solid border-gray-600">
      <div className="p-1">
        {data
          ?.filter(current => current.username !== user?.username)
          .map(user => (
            <div
              className="flex items-center mb-4"
              onClick={() =>
                navigate('/', { state: { username: user.username } })
              }
              key={user.id}
            >
              <img
                className="w-12 h-12 rounded-full mr-3"
                src={
                  picSources[generateRandomNumber()] ||
                  'https://randomuser.me/api/portraits/man/1.jpg'
                }
                alt="User Avatar"
              />
              <div>
                <div className="font-medium">{user.username}</div>
                <div className="text-gray-400">Hello there!</div>
              </div>
            </div>
          ))}
      </div>
    </aside>
  )
}
