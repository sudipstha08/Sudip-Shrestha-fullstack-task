import { Prisma } from '@prisma/client'
import { prisma } from '../infrastructure'

export class UserRepository {
  async findUser(payload: Prisma.UserWhereInput) {
    return await prisma.user.findFirst({
      where: payload,
    })
  }

  async createUser(payload: Prisma.UserCreateInput) {
    return await prisma.user.create({
      data: payload,
    })
  }
}
