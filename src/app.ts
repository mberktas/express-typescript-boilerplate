import { controllerLoader } from '@/loaders/controller.loader'
import fileUpload from 'express-fileupload'
import express, { Application } from 'express'
import Controller from '@/utils/interfaces/controller.interface'
import helmet from 'helmet'
import cors from 'cors'
import expressWinston from 'express-winston'
import logger from '@/utils/logger'
import swaggerDocs from '@/utils/swagger'
import errorMiddleware from '@/middleware/error.middleware'
import Config from '@/utils/config'
import mongoose from 'mongoose'

export default class App {
	private app: Application
	private port: number = Config.PORT as number
	private baseUri: string = '/api/v1'

	constructor() {
		this.app = express()

		this.initializeMiddlewares()
		this.initializeDatabaseConnection()
		this.initializeControllers()
		this.initializeErrorMiddleware()
	}

	public getInstance() {
		return this.app
	}

	listen(port?: number) {
		this.app.listen(this.port, () => {
			logger.info(`App listening on the port ${this.port}`)
		})

		swaggerDocs(this.app)
	}

	private initializeMiddlewares() {
		this.app.use(express.json())
		this.app.use(helmet())
		this.app.use(cors())
		this.app.use(fileUpload())
		this.app.use(
			expressWinston.logger({
				winstonInstance: logger,
				statusLevels: true,
			}),
		)
	}

	private initializeErrorMiddleware() {
		this.app.use(errorMiddleware)
	}

	private async initializeDatabaseConnection() {
		try {
			mongoose.set('strictQuery', false)
			await mongoose.connect(
				`mongodb://${Config.MONGO_USER}:${Config.MONGO_PASSWORD}${Config.MONGO_URI}`,
			)
			// mongoose.connect(`mongodb://${Config.MONGO_URI}`)
			logger.info('Connected to database')
		} catch (err) {
			logger.error("Couldn't connect to database " + err)
		}
	}

	private async initializeControllers() {
		let controllers = await controllerLoader()
		for (let controller of controllers) {
			this.app.use(`${this.baseUri}${controller.path}`, controller.router)
		}
	}
}
