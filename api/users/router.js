const router = require('express').Router()
const UsersModel = require('./model')
const middleware = require('../auth/middleware')

router.get('/', middleware.checkRole, async (req, res, next) => {
  try {
    const users = await UsersModel.getAllUsers()
    res.json(users)
  } catch (error) {
    next(error)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const user = await UsersModel.getUserById(req.params.id)
    res.json(user)
  } catch (error) {
    next(error)
  }
})

router.delete('/:id', async (req, res, next) => {
  try {
    const user = await UsersModel.createUser(req.body)
    res.json(user)
  } catch (error) {
    next(error)
  }
})

router.put('/:id', async (req, res, next) => {})

module.exports = router
