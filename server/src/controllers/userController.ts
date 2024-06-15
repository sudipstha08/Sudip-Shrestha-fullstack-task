import { Request, Response } from 'express'
import { Prisma } from '@prisma/client'
import crypto from 'crypto'
import { UserRepository } from '../repository'
import { generateToken } from '../utils'

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

  public async loginUser(req: Request, res: Response) {
    try {
      const { username, password } = req.body

      const user = await this.userRepository.findUser({ username })

      if (!user) {
        throw {
          message: 'User doesnot exist. Try signing up',
        }
      }

      const hashedPasswordBuffer = Buffer.from(user.password as string)
      const inputPasswordBuffer = Buffer.from(password) // This should be the hashed input password

      if (
        hashedPasswordBuffer.length !== inputPasswordBuffer.length ||
        !crypto.timingSafeEqual(hashedPasswordBuffer, inputPasswordBuffer)
      ) {
        throw { message: 'Invalid username or password' }
      }

      const token = generateToken(user.id)

      res.apiSuccess({
        message: 'Logged in successfully',
        data: {
          user: { username: user.username },
          token,
        },
      })
    } catch (error) {
      res.apiFail({
        message: 'Failed to create user',
        error,
      })
    }
  }
}
