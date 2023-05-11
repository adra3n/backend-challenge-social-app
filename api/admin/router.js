const router = require('express').Router()
const UsersModel = require('../users/model')

router.get('/users', async (req, res, next) => {
  try {
    const users = await UsersModel.getAllUsers()
    res.json(users)
  } catch (error) {
    next(error)
  }
})

router.post('/users', async (req, res, next) => {
  try {
    const newUser = await UsersModel.createUser(req.body)
    res.status(201).json(newUser)
  } catch (error) {
    next(error)
  }
})

router.put('/users/:id', async (req, res, next) => {
  try {
    const updatedUser = await UsersModel.updateUser(req.params.id, req.body)
    res.json(updatedUser)
  } catch (error) {
    next(error)
  }
})

router.delete('/users/:id', async (req, res, next) => {
  try {
    const deletedUser = await UsersModel.removeUser(req.params.id)
    res.json(deletedUser)
  } catch (error) {
    next(error)
  }
})

module.exports = router
