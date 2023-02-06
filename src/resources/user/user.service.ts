import logger from '@/utils/logger'
import { UserNotFoundException } from '@/resources/user/user.exception'
import userModel from '@/resources/user/user.model'

export default class UserService {
	private userRepository = userModel

	public getAllUsers = async () => {
		try {
			const users = await this.userRepository.find()
			return users
		} catch (err: any) {
			logger.error("Couldn't get users " + err)
			throw new UserNotFoundException('-1', "Couldn't get users")
		}
	}
}
