const db = require('../../data/dbConfig')

function getAllPosts() {
  return db('Posts')
}

async function getPostById(post_id) {
  const post = await db('Posts').where('post_id', post_id).first()
  return post
}

async function getPostsByFilter(filter) {
  const post = await db('Posts').where(filter).first()
  return post
}

async function updatePost(post_id, post) {
  return await db('Posts').where('post_id', post_id).first().update(post)
}

async function createPost(post) {
  const [post_id] = await db('Posts').insert(post)
  return await getLikeByFilter('post_id', post_id)
}

async function deletePost(post_id) {
  return await db('Posts').where('post_id', post_id).first().delete()
}

module.exports = {
  getAllPosts,
  getPostsByFilter,
  getPostById,
  createPost,
  updatePost,
  deletePost,
}
