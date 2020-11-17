//modules
const express = require('express')
const cors = require('cors')
const helmet = require('helmet')

//imports
const authRouter = require('../auth/auth-router')

//server
const server = express()

//global middleware
server.use(helmet())
server.use(cors())
server.use(express.json())

//routes
server.use('/api/auth', authRouter)

server.get('/', (req, res) => {
    res.status(200).json({ api: 'up' })
})

module.exports = server