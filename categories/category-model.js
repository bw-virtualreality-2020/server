const db = require('../database/db-config')

function find() {
    return db('categories').orderBy('category_id')
}

function findById(id) {
    return db('categories').where({ 'category_id': id }).first()
}

async function add(category) {
    try {
        const [id] = await db('categories').insert(category, 'category_id')
        return findById(id)
    } catch (err) {
        console.log(err)
        throw err
    }
}

module.exports = {
    find,
    findById,
    add
}