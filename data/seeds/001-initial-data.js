/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

const password1234 =
  '$2a$08$2IKlZUDUOYsuH8AJ.LLNFuOs9L8DMt2Cdw5y6JvcPfFtlZDDUAoBi'
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('Roles').truncate()
  await knex('Users').truncate()
  await knex('Posts').truncate()
  await knex('Comments').truncate()
  await knex('Likes').truncate()

  await knex('Roles').insert([
    {
      role_id: 1,
      role_name: 'user',
    },
    {
      role_id: 2,
      role_name: 'admin',
    },
  ])

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

  await knex('Posts').insert([
    {
      post_id: 1,
      post_text: 'This is the first post',
      post_image: 'https://picsum.photos/seed/sertac/200/200',
      user_id: 1,
      created_at: '2021-05-10 10:00:00',
    },
    {
      post_id: 2,
      post_text: 'This is the second post',
      post_image:
        'https://fastly.picsum.photos/id/58/200/200.jpg?hmac=aol3E3KC2fpsVXlPhgxLR9-CLoUQa-kbswhZx-gYzCE',
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
}
