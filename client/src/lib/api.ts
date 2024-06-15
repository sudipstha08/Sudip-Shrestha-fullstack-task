import axios, { AxiosError, AxiosInstance, AxiosResponse } from 'axios'
import { config, removeItemFromLocalStorage } from '@/utils'
import { SESSION_KEY } from '@/constants'
import { authStore } from '@/store'

export const API: AxiosInstance = axios.create({
  baseURL: config.API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

API.interceptors.request.use(
  async axiosConfig => {
    return axiosConfig
  },
  (error: AxiosError) => Promise.reject(error),
)

API.interceptors.response.use(
  (response: AxiosResponse) => {
    return response.data
  },
  async error => {
    if (error?.response?.data?.status?.code === 401) {
      removeItemFromLocalStorage(SESSION_KEY)
      authStore.setUser(null)
      authStore.setLogout()
    }
    return Promise.reject({
      message: 'Error occured',
      ...error?.response?.data,
    })
  },
)
