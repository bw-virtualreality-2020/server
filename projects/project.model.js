const db = require('../database/db-config')

function find() {
    return db('projects')
}

function findById(id) {
    return db('projects').where({ 'project_id': id }).first()
}

module.exports = {
    find,
    findById
}