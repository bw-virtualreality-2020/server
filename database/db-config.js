//modules
const knex = require('knex')

//imports
const config = require('../knexfile')

//environment
const environment = process.env.DB_ENV || 'development'

//exports
module.exports = knex(config[environment])