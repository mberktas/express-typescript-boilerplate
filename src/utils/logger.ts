import { createLogger, format, transports } from 'winston'

const timezone = () => {
	return new Date().toLocaleString('en-US', { timeZone: 'Europe/Istanbul' })
}

const logger = createLogger({
	transports: [
		new transports.File({
			filename: 'logs/error.log',
			level: 'error',
		}),
		new transports.File({
			filename: 'logs/combined.log',
		}),
		new transports.File({
			filename: 'logs/info.log',
			level: 'info',
		}),
		new transports.File({
			filename: 'logs/warn.log',
			level: 'warn',
		}),
		new transports.File({
			filename: 'logs/debug.log',
			level: 'debug',
		}),
	],
	format: format.combine(
		format.timestamp({ format: timezone }),
		format.json(),
		format.printf((info) => `${info.timestamp} ${info.level}: ${info.message}`),
	),
})

export default logger
