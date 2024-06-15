import { NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { Prisma, User } from '@prisma/client'
import { UserRepository } from '../repository'
import { config } from '../infrastructure'

export const VerifyUser =
  () => async (req: Request, _: Response, next: NextFunction) => {
    try {
      let token = req.headers['authorization']

      token = token?.split(' ')[1]

      if (!token) {
        throw {
          status: {
            code: 401,
            success: false,
          },
          message: 'Invalid token',
        }
      }

      const decoded: any = jwt.verify(token, config.jwtSecret)

      const payload: Prisma.UserWhereInput = {
        id: decoded.id,
      }

      const userService = new UserRepository()

      const user = await userService.findUser(payload)
      if (!user) {
        throw {
          status: {
            code: 401,
            success: false,
          },
          message: 'User doesnot exist',
        }
      }

      ;(<Request>req)['authUser'] = user as Partial<User>
      next()
    } catch (error) {
      next({
        message: 'Unauthorised user',
        status: {
          code: 401,
          success: false,
        },
      })
    }
  }
