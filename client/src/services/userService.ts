import { MutationFunction, QueryFunction } from '@tanstack/react-query'
import { LoginDto, SignUpDto } from '@/containers'
import { User } from '@/interfaces'
import { API } from '@/lib'

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

const signUp: MutationFunction<
  {
    user: User
  },
  SignUpDto
> = async reqParams => {
  const { data } = await API.post('/users', { ...reqParams })
  return data
}

const fetchUsers: QueryFunction<User[]> = async _context => {
  const { data } = await API.get('/users')
  return data
}

export const userService = {
  login,
  signUp,
  fetchUsers,
}
