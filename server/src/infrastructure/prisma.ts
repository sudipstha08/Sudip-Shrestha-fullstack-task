import { PrismaClient } from '@prisma/client'
import { prismaConfig } from '../helpers'

export const prisma = new PrismaClient(prismaConfig)

export const checkDatabaseConnection = async () => {
  try {
    await prisma.$connect()
    console.log('DB Connected ')
  } catch (error) {
    console.error('Error connecting to the database:', error)
  } finally {
    await prisma.$disconnect()
  }
}
