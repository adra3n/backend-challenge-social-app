// const db = require('../../data/dbConfig.js')

// async function getUserIdFromId(id, type) {
//   // type = 'post','comment','like'
//   const table = type + 's'
//   const user_id = await db(table)
//     .select('user_id')
//     .where(type + '_id', parseInt(id))
//     .first()
//   return user_id
// }

// module.exports = {
//   getUserIdFromPostId,
// }

// function checkPassword(password) {
//   return String(password).match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/)
// }

function checkEmail(email) {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    )
}

module.exports = {
  checkEmail,
}
