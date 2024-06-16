import express, { Application, NextFunction, Request, Response } from 'express'
import helmet from 'helmet'
import cors from 'cors'
import bodyParser from 'body-parser'
import { Server, ServerOptions } from 'socket.io'
import { createServer } from 'http'
import { CustomError } from './interfaces'
import { Routes } from './routes'
import { ApiMethods, RequestLog } from './middlewares'
import { SocketRoutes } from './routes/socketRoutes'
import { config } from './infrastructure'

export class App {
  private app: Application
  private routes: Routes
  private socketRoutes: SocketRoutes
  public server: Server
  public serverOptions: ServerOptions

  constructor() {
    this.app = express()
    this.routes = new Routes()
    this.socketRoutes = new SocketRoutes()
    this.initializeMiddlewares()
    this.initSocket()
    this.serverOptions = {
      cors: {
        origin: '*',
        methods: ['GET', 'POST'],
        // credentials: true,
      },
    } as ServerOptions
  }

  private initializeMiddlewares() {
    this.app.use(helmet())
    this.app.use(
      cors({
        origin: '*',
        methods: ['GET', 'POST'],
        credentials: true,
      }),
    )
    this.app.use(
      express.json({
        limit: '150mb',
      }),
    )
    this.app.use(bodyParser.urlencoded({ extended: true, limit: '150mb' }))

    this.app.use('/api', RequestLog, ApiMethods, this.routes.router)

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

  private initSocket() {
    const httpServer = createServer(this.app)
    this.server = new Server(httpServer, this.serverOptions)
    httpServer.listen(config.port, () => {
      console.log('Started =====>')
    })
  }

  public runSocket() {
    this.server.on(
      'connection',
      this.socketRoutes.onConnection.bind(this.socketRoutes),
    )
  }
}
