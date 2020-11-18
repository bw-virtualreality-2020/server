const db = require('../../database/db-config')

function find() {
    return db('projects')
}

function findById(id) {
    return db('projects')
        .where({ 'project_id': id })
        .first()
}

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

module.exports = {
    find,
    findById,
    add
}