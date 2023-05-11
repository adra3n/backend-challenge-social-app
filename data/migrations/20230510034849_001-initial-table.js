/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

exports.up = async function (knex) {
  return await knex.schema
    .createTable('Roles', (table) => {
      table.increments('role_id')
      // role_id:1 = user, role_id:2 = admin
      table.text('role_name').unique().notNullable()
    })
    .createTable('Users', (table) => {
      table.increments('user_id')
      table.text('username').unique().notNullable()
      table.text('user_avatar').defaultTo('default_avatar.png')
      table.text('email').unique().notNullable()
      table.text('password').notNullable()
      // role_id:1 = user, role_id:2 = admin
      table
        .integer('role_id')
        .defaultTo(1)
        .unsigned()
        .notNullable()
        .references('role_id')
        .inTable('Roles')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      table.timestamp('created_at').notNullable().defaultTo(knex.fn.now())
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
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      table.timestamp('created_at').notNullable().defaultTo(knex.fn.now())
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
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      table.timestamp('created_at').notNullable().defaultTo(knex.fn.now())
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
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      table.timestamp('created_at').notNullable().defaultTo(knex.fn.now())
    })

  // .createTable('Follows', (table) => {
  //   table.bigInteger('follower_id').notNullable().unsigned()
  //   table
  //     .bigInteger('user_id')
  //     .notNullable()
  //     .unsigned()
  //     .references('user_id')
  //     .inTable('Users')
  //     .onUpdate('RESTRICT')
  //     .onDelete('RESTRICT')
  //   table.timestamp('created_at').notNullable().defaultTo(knex.fn.now())
  // })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists('Likes')
    .dropTableIfExists('Comments')
    .dropTableIfExists('Posts')
    .dropTableIfExists('Users')
    .dropTableIfExists('Roles')
  // .dropTableIfExists('Follows')
}
