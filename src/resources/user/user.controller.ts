import HttpException from '@/utils/exceptions/http.exception'
import { createUserSchema } from './user.dto'
import { UserNotFoundException } from './user.exception'
import logger from '@/utils/logger'
import { NextFunction, Request, Response, Router } from 'express'
import Controller from '@/utils/interfaces/controller.interface'
import HttpStatus from 'http-status'
import validationMiddleware from '@/middleware/validation.middleware'
import authMiddleware from '@/middleware/auth.middleware'
import UserService from './user.service'

export default class UserController implements Controller {
	path = '/users'
	router = Router()
	userService: UserService = new UserService()

	constructor() {
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
