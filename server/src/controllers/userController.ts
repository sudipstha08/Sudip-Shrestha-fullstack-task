import { Request, Response } from 'express'
import { Prisma } from '@prisma/client'
import { UserRepository } from '../repository'

export class UserController {
  private userRepository: UserRepository

  constructor() {
    this.userRepository = new UserRepository()
  }

  public async createUser(req: Request, res: Response) {
    const { username, password } = req.body

    try {
      const user = await this.userRepository.findUser({ username })
      if (user) {
        throw {
          message: 'User already exists. Try other username',
        }
      }

      const payload: Prisma.UserCreateInput = {
        username,
        password,
      }

      await this.userRepository.createUser(payload)

      res.apiSuccess({
        message: 'User created successfully',
      })
    } catch (error) {
      res.apiFail({
        message: 'Failed to create user',
        error,
      })
    }
  }
}
