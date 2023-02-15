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

	constructor(controllers: Controller[]) {
		this.app = express()

		this.initializeMiddlewares()
		this.initializeDatabaseConnection()
		this.initializeControllers(controllers)
	}

	public getInstance() {
		return this.app
	}

	listen(port?: number) {
		this.app.listen(this.port, () => {
			logger.info(`App listening on the port ${this.port}`)
			console.log(`App listening on the port ${this.port}`)
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

		this.app.use(errorMiddleware)
	}

	private initializeDatabaseConnection(): void {
		try {
			// mongoose.connect(`mongodb://${Config.MONGO_USER}:${Config.MONGO_PASSWORD}${Config.MONGO_URI}`)
			mongoose.connect(`mongodb://${Config.MONGO_URI}`)
			logger.info('Connected to database')
		} catch (err) {
			logger.error("Couldn't connect to database" + err)
		}
	}

	private initializeControllers(controllers: Controller[]) {
		for (let controller of controllers) {
			this.app.use(`${this.baseUri}${controller.path}`, controller.router)
		}
	}
}
