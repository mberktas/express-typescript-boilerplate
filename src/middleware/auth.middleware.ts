import { Request, Response, NextFunction } from 'express'

import { verifyToken } from '@/utils/token'

const authMiddleware = async (request: Request, response: Response, next: NextFunction) => {
	const { authorization } = request.headers
	if (!authorization) {
		return response.status(401).send('Unauthorized')
	}

	const token = authorization.split(' ')[1]
	if (!token) {
		return response.status(401).send('Unauthorized')
	}

	let payload
	try {
		payload = await verifyToken(token)
	} catch (error) {
		return response.status(401).send('Unauthorized')
	}

	console.log('auth middleware  payload is ', payload.id)
	next(payload)
}

export default authMiddleware
