//imports
const Users = require('./user-model')

//router
const router = require('express').Router()

function validateRole(req, res, next) {
    console.log(req.decoded)
    const { role } = req.decoded
    if (role !== 'admin') {
        res.status(401).json({ message: 'Unauthorized' })
    } else {
        next()
    }
}

async function validateId(req, res, next) {
    const id = req.params.id
    try {
        const user = await Users.findById(id)
        if (!user) {
            res.status(404).json({ message: `User with id ${id} not found.` })
        } else {
            req.user = user
            next()
        }
    } catch (err) {
        next(err)
    }
}

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

//[POST] /users
// router.post('/', validateProject, async (req, res, next) => {
//     try {
//         const project = await Users.add(req.body)
//         res.status(201).json({ project })
//     } catch (err) {
//         next(err)
//     }
// })

//[PUT] /users:id
router.put('/:id', validateId, async (req, res, next) => {
    const { id } = req.params
    try {
        const updatedUser = await Users.update(id, req.body)
        res.status(200).json({ updatedUser })
    } catch (err) {
        next(err)
    }
})

//[DELETE] /users/:id
router.delete('/:id', validateId, async (req, res, next) => {
    const { id } = req.params
    try {
        const deletedProjects = await Users.remove(id)
        res.status(200).json({ deletedProjects })
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