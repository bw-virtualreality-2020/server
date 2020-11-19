//imports
const db = require('../../database/db-config')

//access methods
function findById(id) {
    return db('project_categories as pc')
        .join('projects as p', 'pc.project_id', 'p.project_id')
        .join('categories as c', 'pc.category_id', 'c.category_id')
        .select('c.category_name', 'c.category_id')
        .where({ 'pc.project_id': id })
}

function findBy(filter) {
    return db('project_categories').where(filter)
}

async function add(ids) {
    try {
        const [id] = await db('project_categories').insert(ids, 'project_category_id')
        return id
    } catch (err) {
        console.log(err)
        throw err
    }
}

//exports
module.exports = {
    findById,
    findBy,
    add
}