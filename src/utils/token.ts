import User from '@/resources/user/user.interface'
import jwt from 'jsonwebtoken'

export const createToken = (user: User): string => {
	const expiresIn = '1d'

	return jwt.sign(
		{
			id: user.id,
		},
		process.env.JWT_SECRET as jwt.Secret,
		{
			expiresIn: expiresIn,
		},
	)
}

export const verifyToken = async (token: string): Promise<any> => {
	return new Promise((resolve, reject) => {
		jwt.verify(token, process.env.JWT_SECRET as jwt.Secret, (err, decoded) => {
			if (err) reject(err)
			resolve(decoded)
		})
	})
}

export default { createToken, verifyToken }
