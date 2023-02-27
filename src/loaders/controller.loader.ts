import path from 'path'
import { fromDir } from '@/utils/file.helper'
import Controller from '@/utils/interfaces/controller.interface'

export const controllerLoader = async () => {
	const startPath = path.join(process.cwd(), 'src', 'resources')
	const controllers: Controller[] = []

	await fromDir(startPath, /\.controller/, async function (filename: string) {
		console.log('-- found: ', filename)

		const ControllerClass = await import(filename)
		const controllerInstance = new ControllerClass.default()
		controllers.push(controllerInstance)
	})

	return controllers
}
