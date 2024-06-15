import { FC } from 'react'
import { ChatSection, Header, PrivateRoute, Sider } from '@/components'

const HomePageComponent: FC = () => {
  return (
    <main className="h-screen flex flex-col bg-gray-900">
      <Header />
      <div className="flex flex-1">
        <Sider />
        <ChatSection />
      </div>
    </main>
  )
}

export const HomePage = PrivateRoute(HomePageComponent)
