//modules
const request = require('supertest')

//imports
const server = require('./server')

//server tests
describe('server.js module', () => {
    test('testing environment is correct', () => {
        expect(process.env.DB_ENV).toBe('testing')
        expect(process.env.DB_ENV).not.toBe('development')
        expect(process.env.DB_ENV).not.toBe('production')
    })

    test('[GET] / endpoint works', () => {
        return request(server).get('/')
            .expect('Content-Type', /json/)
            .expect({ api: 'up' })
    })
})