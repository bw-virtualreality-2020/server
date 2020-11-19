//imports
const db = require('../../database/db-config')

//access methods
//get categories
function find() {
    return db('categories').orderBy('category_id')
}

//get category by id
function findById(id) {
    return db('categories').where({ 'category_id': id }).first()
}

//add category
async function add(category) {
    try {
        const [id] = await db('categories').insert(category, 'category_id')
        return findById(id)
    } catch (err) {
        console.log(err)
        throw err
    }
}

//exports
module.exports = {
    find,
    findById,
    add
}