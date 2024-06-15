import { Router } from 'express'
import { UserController } from '../controllers'
import { UserValidationSchema } from '../utils'
import { Validate } from '../middlewares'

export class UserRoutes {
  public userRouter: Router
  private userController: UserController

  constructor() {
    this.userRouter = Router({ mergeParams: true })
    this.userController = new UserController()
    this.initializeRoutes()
  }

  public initializeRoutes() {
    this.userRouter.post(
      '/',
      Validate(UserValidationSchema),
      this.userController.createUser.bind(this.userController),
    )
    this.userRouter.post(
      '/login',
      Validate(UserValidationSchema),
      this.userController.loginUser.bind(this.userController),
    )
  }
}
