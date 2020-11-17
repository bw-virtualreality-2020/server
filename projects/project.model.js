const db = require('../database/db-config')

function find() {
    return db('projects').orderBy('project_id')
}

function findById(id) {
    return db('projects').where({ 'project_id': id }).first()
}

async function add(project) {
    try {
        const [id] = await db('projects').insert(project, 'project_id')
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