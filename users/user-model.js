const db = require('../database/db-config')

function find() {
    return db('users')
}

function findBy(filter) {
    return db('users').where(filter)
}

async function add(creds) {
    try {
        const [id] = await db('users').insert(creds)
        return find().where({ id }).first()
    } catch (err) {
        return err
    }
}

module.exports = {
    find, 
    findBy,
    add
}