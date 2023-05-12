const db = require('../../data/dbConfig')

function getAllUsers() {
  return db('Users')
}

async function getUserById(user_id) {
  const user = await db('Users').where('user_id', user_id).first()
  return user
}

async function getUsersByFilter(filter) {
  const users = await db('Users').where(filter)
  return users
}

async function createUser(user) {
  const [user_id] = await db('Users').insert(user)
  return await getUserById(user_id)
}

async function updateUser(user_id, user) {
  await db('Users')
    .where({ user_id: parseInt(user_id) })
    .first()
    .update(user)
  return await getUserById(user_id)
}

async function removeUser(user_id) {
  return await db('Users')
    .where({ user_id: parseInt(user_id) })
    .first()
    .delete()
}

module.exports = {
  getAllUsers,
  getUsersByFilter,
  getUserById,
  createUser,
  updateUser,
  removeUser,
}
