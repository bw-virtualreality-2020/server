//modules
const express = require('express')
const cors = require('cors')
const helmet = require('helmet')

//routers
const authRouter = require('../routes/auth/auth-router')
const userRouter = require('../routes/users/user-router')
const projectRouter = require('../routes/projects/project-router')
const categoryRouter = require('../routes/categories/category-router')

//middleware
const { validateUser } = require('../routes/auth/auth-helpers')
const { authorizeUser } = require('../routes/auth/auth-helpers')

//server
const server = express()

//global middleware
server.use(helmet())
server.use(cors())
server.use(express.json())

//routes
server.use('/api/auth', validateUser, authRouter)
server.use('/api/users', authorizeUser, userRouter)
server.use('/api/projects', authorizeUser, projectRouter)
server.use('/api/categories', authorizeUser, categoryRouter)

//endpoints
//[GET] /
server.get('/', (req, res) => {
    res.status(200).json({ message: 'Welcome' })
})

//exports
module.exports = server