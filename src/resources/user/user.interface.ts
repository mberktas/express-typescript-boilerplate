import { Document } from 'mongoose'
export default interface User extends Document {
	name: string
	email: string
	password: string
	isValidPassword(password: string): Promise<boolean>
}
