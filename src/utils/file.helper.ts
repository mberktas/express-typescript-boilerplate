import fs from 'fs'
import path from 'path'

export const fromDir = async (startPath: string, filter: RegExp, callback: Function) => {
	if (!fs.existsSync(startPath)) return

	const files = fs.readdirSync(startPath)

	for (const file of files) {
		const filePath = path.join(startPath, file)
		const stat = fs.lstatSync(filePath)
		if (stat.isDirectory()) fromDir(filePath, filter, callback)
		else if (filter.test(file)) {
			let normalizePath = filePath.split(/(?<=src)(.*)(?=\.)/)[1]
			normalizePath = '..' + normalizePath
			normalizePath = path.normalize(normalizePath)
			callback(normalizePath)
		}
	}
}
