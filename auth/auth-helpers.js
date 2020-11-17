const jwt = require('jsonwebtoken')
const { jwtSecret } = require('./auth-secrets')

function validateUser(req, res, next) {
    if(req.path === '/register'){
        if (!req.body.username || !req.body.password || !req.body.role || !req.body.email) {
            res.status(400).json({ message: 'Missing required fields.' })
        } else {
            next()
        }
    } else if (req.path === '/login') {
        if(!req.body.username || !req.body.password) {
            res.status(400).json({ message: 'Missing required fields.' })
        } else {
            next()
        }
    }
}

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

module.exports = {
    validateUser,
    generateToken
}