import { MutationFunction } from '@tanstack/react-query'
import { User } from '../interfaces'
import { API } from '../lib'
import { LoginDto } from '@/containers'

const login: MutationFunction<
  {
    user: User
    token: string
  },
  LoginDto
> = async reqParams => {
  const { data } = await API.post('/users/login', { ...reqParams })
  return data
}

export const userService = {
  login,
}
