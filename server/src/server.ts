import { App } from './app'
import { config } from './infrastructure'

const app = new App()

// Starting the server
app.start(config.port)
