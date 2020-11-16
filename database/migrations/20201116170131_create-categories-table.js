exports.up = function (knex) {
    return knex.schema
        .createTable('categories', tbl => {
            tbl.increments('category_id')
            tbl.string('category_name', 128).notNullable().unique()
        })
        .createTable('project_categories', tbl => {
            tbl.increments('project_category_id')
            tbl.integer('project_id')
                .unsigned()
                .notNullable()
                .references('project_id')
                .inTable('projects')
                .onUpdate('CASCADE')
                .onDelete('CASCADE')
            tbl.integer('category_id')
                .unsigned()
                .notNullable()
                .references('category_id')
                .inTable('categories')
                .onUpdate('CASCADE')
                .onDelete('CASCADE')
        })
}

exports.down = function (knex) {
    return knex.schema
        .dropTableIfExists('project_categories')
        .dropTableIfExists('categories')
}
