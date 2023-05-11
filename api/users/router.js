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

router.post('/', authMiddleware.checkRole, async (req, res, next) => {
  try {
    const newUser = await UsersModel.createUser(req.body)
    res.status(201).json(newUser)
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

router.delete(
  '/:id',
  userMiddleware.checkUserIdExists,
  authMiddleware.checkOwner,
  async (req, res, next) => {
    try {
      const user = await UsersModel.removeUser(req.params.id)
      res.json(user)
    } catch (error) {
      next(error)
    }
  }
)

router.put(
  '/:id',
  userMiddleware.checkUserIdExists,
  authMiddleware.checkOwner,
  async (req, res, next) => {
    try {
      const updatedUser = await UsersModel.updateUser(req.params.id, req.body)
      res.json(updatedUser)
    } catch (error) {
      next(error)
    }
  }
)

module.exports = router
