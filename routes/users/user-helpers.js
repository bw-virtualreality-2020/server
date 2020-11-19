//imports
const Users = require('./user-model')

//middleware
function validateRole(req, res, next) {
    const { role } = req.decoded
    if (role !== 'admin') {
        res.status(401).json({ message: 'Unauthorized' })
    } else {
        next()
    }
}

function validateChanges(req, res, next) {
    if (req.body.user_id !== req.decoded.subject) {
        res.status(400).json({ message: 'Cannot change user id.' })
    } else if (req.body.user_role !== 'fundraiser' && req.body.user_role !== 'funder') {
        res.status(400).json({ message: 'User role must be either fundraiser or funder.' })
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

//exports
module.exports = {
    validateRole,
    validateId,
    validateChanges
}