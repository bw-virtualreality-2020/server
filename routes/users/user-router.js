//modules
const bcrypt = require('bcryptjs')

//imports
const Users = require('./user-model')
const rounds = parseInt(process.env.BCRYPT_ROUNDS) || 10
const { validateChanges, validateId, validateRole } = require('./user-helpers')

//router
const router = require('express').Router()

//endpoints
//[GET] /users
router.get('/', validateRole, async (_req, res, next) => {
    try {
        const users = await Users.find()
        res.status(200).json({ users })
    } catch (err) {
        next(err)
    }
})

//[GET] /users/:id
router.get('/:id', validateId, (req, res) => {
    const { user_id } = req.user
    if (user_id === req.decoded.subject) {
        res.status(200).json({ user: req.user })
    } else {
        res.status(401).json({ message: 'Unauthorized' })
    }
})

//[PUT] /users:id
router.put('/:id', validateId, validateChanges, async (req, res, next) => {
    try {
        const { user_id } = req.user
        const { user_password } = req.body
        if (user_id === req.decoded.subject) {
            if (!user_password) {
                const updatedUser = await Users.update(user_id, req.body)
                res.status(200).json({ updatedUser })
            } else {
                const hash = bcrypt.hashSync(user_password, rounds)
                const updatedUser = await Users.update(user_id, { ...req.body, user_password: hash })
                res.status(200).json({ updatedUser })
            }
        } else {
            res.status(401).json({ message: 'Unauthorized' })
        }
    } catch (err) {
        next(err)
    }
})

//[DELETE] /users/:id
router.delete('/:id', validateRole, validateId, async (req, res, next) => {
    const { id } = req.params
    try {
        const deletedUsers = await Users.remove(id)
        res.status(200).json({ deletedUsers })
    } catch (err) {
        next(err)
    }
})

//error handling middleware
router.use((err, _req, res, _next) => {
    console.log(err)
    res.status(500).json({ message: err.message, stack: err.stack, errno: err.errno, code: err.code })
})

//exports
module.exports = router