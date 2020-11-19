//modules
const jwt = require('jsonwebtoken')

//imports
const { jwtSecret } = require('./auth-secrets')

//middleware
function validateUser(req, res, next) {
    if (req.path === '/register') {
        if (!req.body.username || !req.body.password || !req.body.role || !req.body.email) {
            res.status(400).json({ message: 'Missing required fields.' })
        } else if (req.body.role !== 'fundraiser' && req.body.role !== 'funder') {
            res.status(400).json({ message: 'User role must be either fundraiser or funder.' })
        } else {
            next()
        }
    } else if (req.path === '/login') {
        if (!req.body.username || !req.body.password) {
            res.status(400).json({ message: 'Missing required fields.' })
        } else {
            next()
        }
    }
}

function authorize(req, res, next) {
    const jwt = require('jsonwebtoken')
    const { jwtSecret } = require('./auth-secrets')
    const token = req.headers.authorization
    if (!token) {
        res.status(401).json({ message: 'Access denied: missing authorization token.' })
    } else {
        jwt.verify(token, jwtSecret, (err, decoded) => {
            if (err) {
                res.status(401).json({ message: 'Access denied: invalid authorization token.' })
            } else {
                req.decoded = decoded
                next()
            }
        })
    }
}

//helpers
function generateToken(user) {
    const payload = {
        subject: user.user_id,
        username: user.user_username,
        role: user.user_role
    }
    const options = {
        expiresIn: 60 * 60 * 3
    }
    return jwt.sign(payload, jwtSecret, options)
}

//exports
module.exports = {
    validateUser,
    generateToken,
    authorize
}