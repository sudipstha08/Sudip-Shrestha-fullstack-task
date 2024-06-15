import { App } from './app'
import { checkDatabaseConnection, config } from './infrastructure'

const app = new App()

checkDatabaseConnection()

// Starting the server
app.start(config.port)
