import swaggerJsDoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'
import { Response, Request, Application } from 'express'
import logger from '@/utils/logger'

const { version } = require('../../package.json')

const options: swaggerJsDoc.Options = {
	definition: {
		openapi: '3.0.0',
		info: {
			title: 'REST API',
			version: version,
		},

		components: {
			securitySchemas: {
				bearerAuth: {
					type: 'http',
					scheme: 'bearer',
					bearerFormat: 'JWT',
				},
			},
		},
		security: [
			{
				bearerAuth: [],
			},
		],
	},
	apis: ['./src/resources/**/*.controller.ts', './src/resources/**/*.model.ts'],
}

const swaggerSpecs = swaggerJsDoc(options)

function swaggerDocs(app: Application) {
	app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs))

	app.get('/docs.json', (req: Request, res: Response) => {
		res.setHeader('Content-Type', 'application/json')
		res.send(swaggerSpecs)
	})

	logger.info('Swagger docs loaded')
}

export default swaggerDocs
