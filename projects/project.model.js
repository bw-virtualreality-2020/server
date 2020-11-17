const db = require('../database/db-config')

function find() {
    return db('projects')
}

module.exports = {
    find
}