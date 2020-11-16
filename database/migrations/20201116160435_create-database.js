exports.up = function (knex) {
    return knex.schema
        .createTable('users', tbl => {
            tbl.increments('user_id')
            tbl.string('user_username', 128).notNullable().unique()
            tbl.string('user_password', 128).notNullable()
            tbl.string('user_role', 128).notNullable()
            tbl.string('user_email', 128).notNullable().unique()
            tbl.string('user_bio', 255)
            tbl.string('user_image', 255)
        })
        .createTable('donations', tbl => {
            tbl.increments('donation_id')
            tbl.decimal('donation_amount').notNullable()
            tbl.integer('user_id')
                .unsigned()
                .notNullable()
                .references('user_id')
                .inTable('users')
                .onUpdate('CASCADE')
                .onDelete('CASCADE')
            tbl.integer('project_id')
                .unsigned()
                .notNullable()
                .references('project_id')
                .inTable('projects')
                .onUpdate('CASCADE')
                .onDelete('CASCADE')
            
        })
        .createTable('projects', tbl => {
            tbl.increments('project_id')
            tbl.string('project_name', 128).notNullable().unique()
            tbl.string('project_description', 255)
            tbl.decimal('project_goal')
        })
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
        .createTable('user_projects', tbl => {
            tbl.increments('user_project_id')
            tbl.integer('user_id')
                .unsigned()
                .notNullable()
                .references('user_id')
                .inTable('users')
                .onUpdate('CASCADE')
                .onDelete('CASCADE')
            tbl.integer('project_id')
                .unsigned()
                .notNullable()
                .references('project_id')
                .inTable('projects')
                .onUpdate('CASCADE')
                .onDelete('CASCADE')
        })
}

exports.down = function (knex) {
    return knex.schema
        .dropTableIfExists('user_projects')
        .dropTableIfExists('images')
        .dropTableIfExists('projects')
        .dropTableIfExists('donations')
        .dropTableIfExists('users')
}
