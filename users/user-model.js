//imports
const db = require('../database/db-config')

//access methods
//get users
function find() {
    return db('users')
}

//get users by filter
function findBy(filter) {
    return db('users').where(filter)
}

//add user
async function add(creds) {
    try {
        const user = { user_username: creds.username, user_password: creds.password, user_email: creds.email, user_role: creds.role }
        const [id] = await db('users').insert(user, 'user_id')
        return find().where({ 'user_id': id }).first()
    } catch (err) {
        console.log(err)
        throw err
    }
}

//exports
module.exports = {
    find,
    findBy,
    add
}