const UsersModel = require('../users/model')

async function checkUserIdExists(req, res, next) {
  try {
    const { id } = req.params
    const user = await UsersModel.getUserById(id)
    if (user) {
      req.user = user
      next()
    } else {
      res.status(404).json({ message: 'User not found' })
    }
  } catch (error) {
    next(error)
  }
}

module.exports = {
  checkUserIdExists,
}
