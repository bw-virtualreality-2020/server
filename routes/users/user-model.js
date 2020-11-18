//imports
const db = require('../../database/db-config')

//access methods
//get users
function find() {
    return db('users')
}

function findById(id) {
    return db('users')
        .where({ 'user_id': id })
        .first()
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

//update user
async function update(id, updates) {
    try {
        const count = await db('users').where({ 'user_id': id }).update(updates)
        return count === 1 ? findById(id) : null
    } catch (err) {
        console.log(err)
        throw err
    }
}

function remove(id) {
    return db('users')
        .where({ 'user_id': id })
        .del()
}

//exports
module.exports = {
    find,
    findBy,
    findById,
    add,
    update,
    remove
}