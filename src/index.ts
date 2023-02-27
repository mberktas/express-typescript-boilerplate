import 'module-alias/register'
import 'reflect-metadata'
import 'dotenv/config'
import Config from '@/utils/config'
import App from './app'

Config.validateEnv()

const app = new App()

if (Config.NODE_ENV !== 'test') app.listen()

export default app.getInstance()
