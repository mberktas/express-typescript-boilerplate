import { Schema, model } from 'mongoose'
import User from '@/resources/user/user.interface'
import bcrypt from 'bcrypt'

const UserSchema = new Schema({
	name: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
	},
	password: {
		type: String,
		required: true,
	},
})

UserSchema.pre<User>('save', function (next) {
	if (!this.isModified('password')) {
		return next()
	}
	this.password = bcrypt.hashSync(this.password, 10)
	next()
})

UserSchema.methods.isValidPassword = async function (password: string) {
	try {
		return await bcrypt.compare(password, this.password)
	} catch (error: any) {
		throw new Error(error)
	}
}   

export default model<User>('User', UserSchema)
