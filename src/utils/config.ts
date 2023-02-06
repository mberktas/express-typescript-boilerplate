import { cleanEnv, str, port } from 'envalid'

abstract class Config {
	static PORT = process.env.PORT || 8080
	static MONGO_URI = process.env.MONGO_URI || ''
	static MONGO_USER = process.env.MONGO_USER || ''
	static MONGO_PASSWORD = process.env.MONGO_PASSWORD || ''
	static JWT_SECRET = process.env.JWT_SECRET || ''
	static NODE_ENV = process.env.NODE_ENV || 'development'

	static validateEnv = (): void => {
		cleanEnv(process.env, {
			MONGO_USER: str(),
			MONGO_PASSWORD: str(),
			MONGO_URI: str(),
			PORT: port({
				default: 8080,
			}),
			JWT_SECRET: str(),
			NODE_ENV: str({
				default: 'development',
			}),
		})
	}
}

export default Config
