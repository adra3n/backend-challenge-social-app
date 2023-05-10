/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

const password1234 =
  '$2a$08$2IKlZUDUOYsuH8AJ.LLNFuOs9L8DMt2Cdw5y6JvcPfFtlZDDUAoBi'
// '$2a$08$gGB73G42u2d0lV2s162Npef0FPLAdYuCoHD9xAyK/clGrJYnsy.eu'
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('Users').truncate()
  await knex('Users').insert([
    {
      username: 'sertac',
      password: '$2a$08$2IKlZUDUOYsuH8AJ.LLNFuOs9L8DMt2Cdw5y6JvcPfFtlZDDUAoBi',
      email: 'sertackocagil@gmail.com',
      role_id: 2,
      user_avatar: 'avatar1.png',
    },
    {
      username: 'volkan',
      password: '$2a$08$2IKlZUDUOYsuH8AJ.LLNFuOs9L8DMt2Cdw5y6JvcPfFtlZDDUAoBi',
      email: 'volkan@gmail.com',
      role_id: 1,
      user_avatar: 'avatar2.png',
    },
  ])
  await knex('Posts').truncate()
  await knex('Posts').insert([
    {
      post_id: 1,
      post_text: 'This is the first post',
      post_image: 'post1.png',
      user_id: 1,
      created_at: '2021-05-10 10:00:00',
    },
    {
      post_id: 2,
      post_text: 'This is the second post',
      post_image: 'post2.png',
      user_id: 1,
      created_at: '2021-05-10 10:00:00',
    },
    {
      post_id: 3,
      post_text: 'No image post',
      user_id: 2,
      created_at: '2021-05-10 10:00:00',
    },
  ])
  await knex('Comments').truncate()
  await knex('Comments').insert([
    {
      comment_id: 1,
      comment_owner_id: 2,
      comment_text: 'first!',
      post_id: 1,
      created_at: '2021-05-10 10:00:00',
    },
    {
      comment_id: 2,
      comment_owner_id: 1,
      comment_text: 'Nice post',
      post_id: 1,
      created_at: '2021-05-10 10:00:00',
    },
    {
      comment_id: 3,
      comment_owner_id: 1,
      comment_text: 'Thanks',
      post_id: 2,
      created_at: '2021-05-10 10:00:00',
    },
  ])
  await knex('Likes').truncate()
  await knex('Likes').insert([
    {
      like_id: 1,
      like_owner_id: 1,
      post_id: 1,
      created_at: '2021-05-10 10:00:00',
    },
    {
      like_id: 2,
      like_owner_id: 2,
      post_id: 1,
      created_at: '2021-05-10 10:00:00',
    },
    {
      like_id: 3,
      like_owner_id: 1,
      post_id: 2,
      created_at: '2021-05-10 10:00:00',
    },
  ])
  // await knex('Roles').truncate()
  // await knex('Roles').insert([
  //   {
  //     role_id: 1,
  //     role_name: 'user',
  //   },
  //   {
  //     role_id: 2,
  //     role_name: 'admin',
  //   },
  // ])
}
