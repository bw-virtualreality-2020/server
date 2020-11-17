const db = require('../../database/db-config')

function find() {
    return db('images').orderBy('image_id')
}

function findById(id) {
    return db('images').where({ 'image_id': id }).first()
}

async function add(image) {
    try {
        const [id] = await db('images').insert(image, 'image_id')
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