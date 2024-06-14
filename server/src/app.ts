import express, { Application, NextFunction, Request, Response } from 'express'
import helmet from 'helmet'
import cors from 'cors'
import bodyParser from 'body-parser'
import { CustomError } from './interfaces'

export class App {
  private app: Application

  constructor() {
    this.app = express()
    this.initializeMiddlewares()
  }

  private initializeMiddlewares() {
    this.app.use(helmet())
    this.app.use(cors())
    this.app.use(bodyParser.urlencoded({ extended: true, limit: '150mb' }))

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
