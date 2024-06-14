import { PrismaClient } from '@prisma/client'
import { prismaConfig } from '../helpers'

const prisma = new PrismaClient(prismaConfig)
export { prisma }
