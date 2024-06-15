import { QueryClientProvider } from '@tanstack/react-query'
import { Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { queryClient } from '@/lib'
import { useClientAuthentication } from './hooks'
import { HomePage, NotFoundPage, LoginPage, SignupPage } from '@/containers'
import 'react-toastify/dist/ReactToastify.css'
import './App.css'

function App() {
  useClientAuthentication()
  return (
    <QueryClientProvider client={queryClient}>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/sign-up" element={<SignupPage />} />
        <Route element={<NotFoundPage />} path="*" />
      </Routes>
    </QueryClientProvider>
  )
}

export default App
