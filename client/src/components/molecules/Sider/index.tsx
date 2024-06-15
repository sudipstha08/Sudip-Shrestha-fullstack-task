import { FC } from 'react'

export const Sider: FC = () => {
  return (
    <aside className="bg-gray-900 text-white w-[350px] h-full p-4 border-r border-solid border-gray-600">
      <nav>
        <ul>
          <li className="mb-4">
            <a href="#" className="hover:text-gray-400">
              Home
            </a>
          </li>
          <li className="mb-4">
            <a href="#" className="hover:text-gray-400">
              Profile
            </a>
          </li>
          <li className="mb-4">
            <a href="#" className="hover:text-gray-400">
              Messages
            </a>
          </li>
          <li className="mb-4">
            <a href="#" className="hover:text-gray-400">
              Settings
            </a>
          </li>
        </ul>
      </nav>
    </aside>
  )
}
