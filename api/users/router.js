const router = require('express').Router()
const UsersModel = require('./model')
const authMiddleware = require('../auth/middleware')
const userMiddleware = require('./middleware')

router.get('/', authMiddleware.checkRole, async (req, res, next) => {
  try {
    const users = await UsersModel.getAllUsers()
    res.json(users)
  } catch (error) {
    next(error)
  }
})

router.get('/:id', userMiddleware.checkUserIdExists, async (req, res, next) => {
  try {
    const user = await UsersModel.getUserById(req.params.id)
    res.json(user)
  } catch (error) {
    next(error)
  }
})

router.post(
  '/',
  authMiddleware.checkRole,
  userMiddleware.checkUserPayload,
  async (req, res, next) => {
    try {
      const newUser = await UsersModel.createUser(req.body)
      res.status(201).json(newUser)
    } catch (error) {
      next(error)
    }
  }
)

router.put(
  '/:id',
  userMiddleware.checkUserIdExists,
  userMiddleware.checkOwnerOfProfile,
  userMiddleware.checkUserPayload,
  async (req, res, next) => {
    try {
      const oldUser = await UsersModel.getUserById(req.params.id)
      const newUser = {
        user_id: req.params.id,
        user_username: req.body.user_username,
        user_email: req.body.user_email,
        user_password: req.body.user_password,
        user_role: oldUser.user_role,
        user_avatar: req.body.user_avatar
          ? req.body.user_avatar
          : oldUser.user_avatar,
        created_at: oldUser.created_at,
        updated_at: new Date().toISOString(),
      }
      const updatedUser = await UsersModel.updateUser(req.params.id, newUser)
      res
        .status(200)
        .json({ updatedUser, message: `updated user with id ${req.params.id}` })
    } catch (error) {
      next(error)
    }
  }
)

router.delete(
  '/:id',
  userMiddleware.checkUserIdExists,
  userMiddleware.checkOwnerOfProfile,
  async (req, res, next) => {
    try {
      const user = await UsersModel.removeUser(req.params.id)

      res.status(200).json({ message: `deleted user with id ${req.params.id}` })
    } catch (error) {
      next(error)
    }
  }
)

module.exports = router
