import express, { Application, NextFunction, Request, Response } from 'express'
import helmet from 'helmet'
import cors from 'cors'
import bodyParser from 'body-parser'
import { CustomError } from './interfaces'
import { Routes } from './routes'
import { ApiMethods } from './middlewares'

export class App {
  private app: Application
  private routes: Routes

  constructor() {
    this.app = express()
    this.routes = new Routes()
    this.initializeMiddlewares()
  }

  private initializeMiddlewares() {
    this.app.use(helmet())
    this.app.use(cors())
    this.app.use(bodyParser.urlencoded({ extended: true, limit: '150mb' }))

    this.app.use('/api', ApiMethods, this.routes.router)

    this.app.get('/ping', (_, res: Response) => {
      res.json({ message: 'Server is running' })
    })

    this.app.use((_, __, next: NextFunction) => {
      next({
        message: 'Route Not Found',
        status: {
          code: 404,
          success: false,
        },
        error: {},
      })
    })

    /**
     * Error handler
     */
    this.app.use(
      (err: CustomError, _: Request, res: Response, __: NextFunction): void => {
        res.status(err?.status?.code || 500).json(err)
      },
    )
  }

  public start(port: number | string) {
    const PORT = parseInt(port as string)
    this.app.listen(PORT, () => {
      console.log('<----------------------------------------->')
      // eslint-disable-next-line security-node/detect-crlf
      console.log(`🏃🏃🏃 Server is running on PORT ${PORT} 🏃🏃🏃`)
      console.log('<----------------------------------------->')
    })
  }
}
