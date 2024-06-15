import { App } from './app'
import { checkDatabaseConnection, config, prisma } from './infrastructure'

const app = new App()

checkDatabaseConnection()

// Starting the server
app.start(config.port)

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
