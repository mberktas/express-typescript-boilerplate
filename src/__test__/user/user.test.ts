import HttpStatus from 'http-status'
import request from 'supertest'
import app from '../../index'

describe('GET /users', () => {
	it('should return a list of users', async () => {
		await request(app).get('/api/v1/users').expect(HttpStatus.OK)
	})
})
