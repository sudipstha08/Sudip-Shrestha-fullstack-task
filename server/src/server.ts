import { App } from './app'
import { checkDatabaseConnection, prisma } from './infrastructure'

const app = new App()

checkDatabaseConnection()

// Starting the server
app.runSocket()

const shutdown = async () => {
  try {
    await prisma.$disconnect()
    console.log('<-------Prisma disconnected--------->')
    app.server.close(() => {
      console.log('Server closed')
      process.exit(0)
    })
  } catch (err) {
    console.error('<-------Error during shutdown----->', err)
    process.exit(1)
  }
}

process.on('SIGTERM', shutdown)
process.on('SIGINT', shutdown)
