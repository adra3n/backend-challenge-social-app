/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema
    .createTable('Users', (table) => {
      table.increments('user_id')
      table.text('user_name').unique().notNullable()
      table.text('user_avatar').defaultTo('default_avatar.png')
      table.text('email').unique().notNullable()
      table.text('password').notNullable()
      table.text('role').defaultTo('user')
    })

    .createTable('Posts', (table) => {
      table.bigIncrements('post_id')
      table.text('post_text').notNullable()
      table.text('post_image')
      table
        .bigInteger('user_id')
        .notNullable()
        .unsigned()
        .references('user_id')
        .inTable('Users')
        .onUpdate('RESTRICT')
        .onDelete('RESTRICT')
    })

    .createTable('Comments', (table) => {
      table.increments('comment_id')
      table.bigInteger('comment_owner_id').notNullable().unsigned()
      table.text('comment_text').notNullable()
      table
        .bigInteger('post_id')
        .notNullable()
        .unsigned()
        .references('post_id')
        .inTable('Posts')
        .onUpdate('RESTRICT')
        .onDelete('RESTRICT')
    })

    .createTable('Likes', (table) => {
      table.increments('like_id')
      table.bigInteger('like_owner_id').notNullable().unsigned()
      table
        .bigInteger('post_id')
        .notNullable()
        .unsigned()
        .references('post_id')
        .inTable('Posts')
        .onUpdate('RESTRICT')
        .onDelete('RESTRICT')
    })
  //FOLLOWERS
  //ROLES?
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  knex.schema
    .dropTableIfExists('Likes')
    .dropTableIfExists('Comments')
    .dropTableIfExists('Posts')
    .dropTableIfExists('Users')
}
