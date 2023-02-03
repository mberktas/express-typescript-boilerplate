import HttpException from '@/utils/exceptions/http.exception'
import { createUserSchema } from './user.dto'
import { UserNotFoundException } from './user.exception'
import logger from '@/utils/logger'
import { NextFunction, Request, Response, Router } from 'express'
import Controller from '@/utils/interfaces/controller.interface'
import HttpStatus from 'http-status'
import userRepository from '@/resources/user/user.model'
import validationMiddleware from '@/middleware/validation.middleware'
import authMiddleware from '@/middleware/auth.middleware'

export default class UserController implements Controller {
	path = '/users'
	router = Router()
	userRepository = userRepository

	constructor() {
		this.initializeRoutes()
	}
	initializeRoutes() {
		this.router.get('/', this.getAllUsers)
		this.router.get('/:id', this.getUserById)
		this.router.post('/', [validationMiddleware(createUserSchema)], this.createUser) // TODO: Add auth middleware
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
		try {
			const users = await userRepository.find()
			response.status(HttpStatus.OK).json(users)
		} catch (err: any) {
			logger.error("Couldn't get users" + err)
			throw new UserNotFoundException('-1', "Couldn't get users")
		}
	}

	private getUserById = async (request: Request, response: Response, next: NextFunction) => {
		const id = request.params.id
		try {
			const user = await userRepository.findById(id)
			if (user) {
				response.status(HttpStatus.OK).json(user)
			} else {
				logger.error("Couldn't get user " + id)
				throw new UserNotFoundException(id, "Couldn't get user")
			}
		} catch (err: any) {
			logger.error(err)
			throw new Error(err)
		}
	}

	private createUser = async (request: Request, response: Response, next: NextFunction) => {
		const payload = request.body
		try {
			const user = await userRepository.create(payload)
			response.status(HttpStatus.OK).json(user)
		} catch (err: any) {
			logger.error("Couldn't create user" + err)
			throw new HttpException(HttpStatus.INTERNAL_SERVER_ERROR, "Couldn't create user")
		}
	}
}
