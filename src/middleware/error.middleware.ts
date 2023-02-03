import HttpException from '@/utils/exceptions/http.exception'
import { Request, Response, NextFunction } from 'express'

const errorMiddleware = (
	err: HttpException,
	req: Request,
	res: Response,
	next: NextFunction,
): void => {
	const { message, status } = err

	res.status(status).send(err)
}

export default errorMiddleware
