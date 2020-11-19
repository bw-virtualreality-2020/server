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

//get category projects
function findProjects(id) {
    return db('project_categories as pc')
        .join('projects as p', 'pc.project_id', 'p.project_id')
        .join('categories as c', 'pc.category_id', 'c.category_id')
        .select('p.project_id', 'p.project_name', 'p.project_description', 'p.project_goal', 'p.project_image')
        .where({ 'pc.category_id': id })
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
    findProjects,
    add
}