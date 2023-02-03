import HttpException from '@/utils/exceptions/http.exception'
import HttpStatus from 'http-status'
export class UserNotFoundException extends HttpException {
	constructor(id: string, mesage: string = 'User not found') {
		super(HttpStatus.NOT_FOUND, `User with id ${id} not found`)
	}
}

export class UserNotAuthorizedException extends HttpException {
	constructor(id: string, mesage: string = 'User not authorized') {
		super(HttpStatus.UNAUTHORIZED, `User with id ${id} not authorized`)
	}
}

export class UserNotMatchCredentialsException extends HttpException {
	constructor(mesage: string = 'User not match credentials') {
		super(HttpStatus.UNAUTHORIZED, `User not match credentials`)
	}
}

export class UserNotCreatedException extends HttpException {
	constructor(mesage: string = 'User not created') {
		super(HttpStatus.BAD_REQUEST, `User not created`)
	}
}
