const db = require('../../data/dbConfig')

async function getAllComments() {
  return db('Comments as c')
    .leftJoin('Users as u', 'c.comment_owner_id', 'u.user_id')
    .select('c.*', 'u.username', 'u.user_avatar', 'u.user_id')
}

async function getCommentById(comment_id) {
  const comment = await db('Comments').where('comment_id', comment_id).first()
  return comment
}

async function getCommentsByPostId(post_id) {
  const comments = await db('Comments').where('post_id', parseInt(post_id))
  return comments
}

async function getCommentsByFilter(filter) {
  const comments = await db('Comments').where(filter)
  return comments
}

async function updateComment(comment_id, comment) {
  await db('Comments').where('comment_id', comment_id).first().update(comment)
  return await getCommentById(comment_id)
}

async function createComment(comment) {
  const [comment_id] = await db('Comments').insert(comment)
  return await getCommentById(comment_id)
}

async function deleteComment(comment_id) {
  return await db('Comments').where('comment_id', comment_id).first().delete()
}

module.exports = {
  getCommentsByFilter,
  getCommentsByPostId,
  createComment,
  deleteComment,
  updateComment,
  getCommentById,
  getAllComments,
}
