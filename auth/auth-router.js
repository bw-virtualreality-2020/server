//modules
const bcrypt = require('bcryptjs')

//imports
const { generateToken, validateUser } = require('./auth-helpers')
const rounds = parseInt(process.env.HASH_ROUNDS) || 10
const Users = require('../users/user-model')

//router
const router = require('express').Router()

//endpoints
router.post('/register', validateUser, async (req, res) => {
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

router.post('/login', validateUser, async (req, res) => {
    res.json({ login: 'works' })
//   const { username, password } = req.body
//   try {
//     const user = await Users.findBy({ username }).first()
//     if (user && bcrypt.compareSync(password, user.password)) {
//       const token = generateToken(user)
//       res.status(200).json({ message: `Welcome ${user.username}`, token })
//     } else {
//       res.status(401).json({ message: 'Invalid username or password' })
//     }
//   } catch (err) {
//     res.status(500).json({ message: err.message, stack: err.stack })
//   }
})

module.exports = router

