//imports
const db = require('../../database/db-config')

//get projects
function find() {
    return db('projects')
}

//get project by id
function findById(id) {
    return db('projects')
        .where({ 'project_id': id })
        .first()
}

//add project
async function add(project) {
    try {
        const newProject = { ...project, project_image: project.project_image || 'https://specials-images.forbesimg.com/imageserve/1150698673/960x0.jpg?fit=scale' }
        const [id] = await db('projects').insert(newProject, 'project_id')
        return findById(id)
    } catch (err) {
        console.log(err)
        throw err
    }
}

//update project
async function update(id, updates) {
    try {
        const count = await db('projects').where({ 'project_id': id }).update(updates)
        return count === 1 ? findById(id) : null
    } catch (err) {
        console.log(err)
        throw err
    }
}

//delete project
function remove(id) {
    return db('projects')
        .where({ 'project_id': id })
        .del()
}

//exports
module.exports = {
    find,
    findById,
    add,
    update,
    remove
}