import 'module-alias/register'
import 'dotenv/config'
import Config from '@/utils/config'
import App from './app'
import UserController from '@/resources/user/user.controller'

Config.validateEnv()

const controllers = [new UserController()]
const app = new App(controllers)

if (Config.NODE_ENV !== 'test') app.listen()

export default app.getInstance()
