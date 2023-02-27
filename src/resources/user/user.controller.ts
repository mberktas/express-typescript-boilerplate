import { autoInjectable } from 'tsyringe'
import { NextFunction, Request, Response, Router } from 'express'
import Controller from '@/utils/interfaces/controller.interface'
import HttpStatus from 'http-status'
import UserService from './user.service'

@autoInjectable()
export default class UserController implements Controller {
	readonly path = '/users'
	readonly router = Router()

	constructor(private readonly userService: UserService) {
		this.initializeRoutes()
	}
	initializeRoutes() {
		this.router.get('/', this.getAllUsers)
	}

	/**
	 * @openapi
	 * /users:
	 *   get:
	 *     description: Get all users
	 *     responses:
	 *       200:
	 *         description: Returns all users
	 */
	private getAllUsers = async (request: Request, response: Response, next: NextFunction) => {
		const users = await this.userService.getAllUsers()
		response.status(HttpStatus.OK).json(users)
	}
}
