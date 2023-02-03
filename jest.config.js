module.exports = {
	preset: 'ts-jest',
	testEnvironment: 'node',
	moduleNameMapper: {
		'@/resources/(.*)': '<rootDir>/src/resources/$1',
		'@/middleware/(.*)': '<rootDir>/src/middleware/$1',
		'@/utils/(.*)': '<rootDir>/src/utils/$1',
		'@/.(.*)': '<rootDir>/src/$1',
	},
}
