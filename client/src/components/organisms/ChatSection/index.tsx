import { FC } from 'react'

export const ChatSection: FC = () => {
  return (
    <section className="flex flex-col w-[100%]">
      <div className="bg-gray-200 dark:bg-gray-800 flex-1 overflow-y-auto pt-2">
        <div className="px-4 py-2">
          <div className="flex items-center mb-2">
            <img
              className="w-8 h-8 rounded-full mr-2"
              src="https://picsum.photos/200/300"
              alt="User1 avatar"
              height={32}
              width={32}
            />
            <div className="font-medium dark:text-white">John Doe</div>
          </div>
          <div className="bg-white dark:bg-gray-700 dark:text-white rounded-lg p-2 shadow mb-2 max-w-sm">
            Hi, how can I help you?
          </div>
          <div className="flex items-center justify-end">
            <div className="bg-blue-500 text-white rounded-lg p-2 shadow mr-2 max-w-sm">
              Sure, I can help with that.
            </div>
            <img
              className="w-8 h-8 rounded-full"
              src="https://picsum.photos/50/50"
              alt="User2 avatar"
              height={32}
              width={32}
            />
          </div>
        </div>
      </div>

      <div className="bg-gray-100 dark:bg-gray-900 px-4 py-2 border-t border-solid border-gray-600">
        <div className="flex items-center">
          <input
            className="w-full border rounded-full py-2 px-4 mr-2 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            type="text"
            placeholder="Type your message..."
          />
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-full">
            Send
          </button>
        </div>
      </div>
    </section>
  )
}
