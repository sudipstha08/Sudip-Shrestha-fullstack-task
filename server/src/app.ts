import express, { Application, NextFunction, Request, Response } from 'express'
import helmet from 'helmet'
import cors from 'cors'
import bodyParser from 'body-parser'
import { CustomError } from './interfaces'

class App {
  public app: Application

  constructor() {
    this.app = express()
    this.initializeMiddlewares()
  }

  private initializeMiddlewares() {
    this.app.use(helmet())
    this.app.use(cors())
    this.app.use(bodyParser.urlencoded({ extended: true, limit: '150mb' }))

    this.app.get('/ping', (req, res: Response) => {
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

  public start(port: number) {
    this.app.listen(port, () => {
      console.log("<----------------------------------------->")
      console.log(`🏃🏃🏃 Server is running on PORT ${port} 🏃🏃🏃`)
      console.log("<----------------------------------------->")
    })
  }
}
