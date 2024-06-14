import { Router } from 'express'
import { UserController } from '../controllers'

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
      this.userController.createUser.bind(this.userController),
    )
  }
}
