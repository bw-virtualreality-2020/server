//modules
const bcrypt = require('bcryptjs')

//imports
const { generateToken } = require('./auth-helpers')
const rounds = parseInt(process.env.BCRYPT_ROUNDS) || 10
const Users = require('../users/user-model')

//router
const router = require('express').Router()

//endpoints
//[POST] /register
router.post('/register', async (req, res) => {
    try {
        const { password } = req.body
        const hash = bcrypt.hashSync(password, rounds)
        const creds = { ...req.body, password: hash }
        const user = await Users.add(creds)
        const token = generateToken(user)
        res.status(201).json({ user, token })
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: err.message, stack: err.stack, code: err.code, errno: err.errno })
    }
})

//[POST] /login
router.post('/login', async (req, res) => {
    const { username, password } = req.body
    try {
        const user = await Users.findBy({ 'user_username': username }).first()
        if (user && bcrypt.compareSync(password, user.user_password)) {
            const token = generateToken(user)
            res.status(200).json({ user, token })
        } else {
            res.status(401).json({ message: 'Invalid username or password.' })
        }
    } catch (err) {
        res.status(500).json({ message: err.message, stack: err.stack })
    }
})

//exports
module.exports = router


