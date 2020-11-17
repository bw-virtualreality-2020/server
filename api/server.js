//modules
const express = require('express')
const cors = require('cors')
const helmet = require('helmet')

//routers
const authRouter = require('../auth/auth-router')
const projectRouter = require('../projects/project-router')
const categoryRouter = require('../categories/category-router')

//middleware
const { validateUser } = require('../auth/auth-helpers')
const { authorize } = require('../auth/auth-helpers')

//server
const server = express()

//global middleware
server.use(helmet())
server.use(cors())
server.use(express.json())

//routes
server.use('/api/auth', validateUser, authRouter)
server.use('/api/projects', authorize, projectRouter)
server.use('/api/categories', authorize, categoryRouter)

//endpoints
//[GET] /
server.get('/', (req, res) => {
    res.status(200).json({ message: 'Welcome' })
})

//exports
module.exports = server