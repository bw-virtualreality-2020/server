exports.up = function (knex) {
    return knex.schema
        .dropTableIfExists('images')
}

exports.down = function (knex) {
    return knex.schema
        .createTable('images', tbl => {
            tbl.increments('image_id')
            tbl.string('image_url', 255).notNullable()
            tbl.integer('project_id')
                .unsigned()
                .notNullable()
                .references('project_id')
                .inTable('projects')
                .onUpdate('CASCADE')
                .onDelete('CASCADE')
        })
}