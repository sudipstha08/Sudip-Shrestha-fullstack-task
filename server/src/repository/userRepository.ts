import { Prisma } from '@prisma/client'
import { prisma } from '../infrastructure'

export class UserRepository {
  async findUser(payload: Prisma.UserWhereInput) {
    return await prisma.user.findFirst({
      where: payload,
      select: {
        id: true,
        username: true,
        password: true,
        createdAt: true,
        updatedAt: true,
      },
    })
  }

  async fetchUsers(payload: Prisma.UserWhereInput) {
    return await prisma.user.findMany({
      where: payload,
      select: {
        id: true,
        username: true,
        createdAt: true,
        updatedAt: true,
      },
    })
  }

  async createUser(payload: Prisma.UserCreateInput) {
    return await prisma.user.create({
      data: payload,
    })
  }
}
