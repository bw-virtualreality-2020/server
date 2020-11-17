const db = require('../database/db-config')

function find() {
    return db('users')
}

function findBy(filter) {
    return db('users').where(filter)
}

async function add(creds) {
    try {
        const user = { user_username: creds.username, user_password: creds.password, user_email: creds.email, user_role: creds.role }
        const [id] = await db('users').insert(user)
        return find().where({ 'user_id': id }).first()
    } catch (err) {
        console.log(err)
        throw err
    }
}

module.exports = {
    find, 
    findBy,
    add
}