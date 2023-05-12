const UsersModel = require('../users/model')
const Helpers = require('../helpers/helpers')

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

async function checkOwnerOfProfile(req, res, next) {
  try {
    const { id } = req.params
    const user = await UsersModel.getUserById(id)
    if (user.user_id == req.decodedToken.user_id) {
      next()
    } else {
      res
        .status(403)
        .json({ message: 'You re not authorized for that action!' })
    }
  } catch (error) {
    next(error)
  }
}

async function checkUserPayload(req, res, next) {
  const { username, password, email } = req.body
  if (
    username &&
    username !== undefined &&
    username !== null &&
    username !== '' &&
    password &&
    password !== undefined &&
    password !== null &&
    password !== '' &&
    Helpers.checkEmail(email) &&
    email !== undefined &&
    email !== null &&
    email !== ''
  ) {
    req.user = req.body
    next()
  } else {
    res
      .status(400)
      .json({ message: 'Username, password and email are required' })
  }
}

module.exports = {
  checkUserIdExists,
  checkOwnerOfProfile,
  checkUserPayload,
}
