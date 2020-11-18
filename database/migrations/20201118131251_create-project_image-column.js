exports.up = function (knex) {
    return knex.schema
        .table('projects', tbl => {
            tbl.string('project_image', 255)
        })
}

exports.down = function (knex) {
    return knex.schema
        .table('projects', tbl => {
            tbl.dropColumn('project_image')
        })
}