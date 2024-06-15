import { FC } from 'react'

export const Sider: FC = () => {
  return (
    <aside className="bg-gray-900 text-white w-[350px] h-full p-4 border-r border-solid border-gray-600">
      <div className="p-1">
        {/* Chat item */}
        <div className="flex items-center mb-4">
          <img
            className="w-12 h-12 rounded-full mr-3"
            src="https://picsum.photos/200"
            alt="User Avatar"
          />
          <div>
            <div className="font-medium">John Doe</div>
            <div className="text-gray-400">Hello there!</div>
          </div>
        </div>

        {/* Chat item */}
        <div className="flex items-center mb-4">
          <img
            className="w-12 h-12 rounded-full mr-3"
            src="https://randomuser.me/api/portraits/women/2.jpg"
            alt="User Avatar"
          />
          <div>
            <div className="font-medium">Jane Smith</div>
            <div className="text-gray-400">Hi John!</div>
          </div>
        </div>

        {/* Chat item */}
        <div className="flex items-center mb-4">
          <img
            className="w-12 h-12 rounded-full mr-3"
            src="https://randomuser.me/api/portraits/men/3.jpg"
            alt="User Avatar"
          />
          <div>
            <div className="font-medium">Mike Johnson</div>
            <div className="text-gray-400">Hey guys, how are you?</div>
          </div>
        </div>

        {/* Chat item */}
        <div className="flex items-center mb-4">
          <img
            className="w-12 h-12 rounded-full mr-3"
            src="https://randomuser.me/api/portraits/women/4.jpg"
            alt="User Avatar"
          />
          <div>
            <div className="font-medium">Emily Brown</div>
            <div className="text-gray-400">What's up?</div>
          </div>
        </div>
      </div>
    </aside>
  )
}
