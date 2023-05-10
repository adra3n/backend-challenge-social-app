const router = require('express').Router()
const UsersModel = require('../users/model')
const middleware = require('./middleware')

router.post(
  '/register',
  middleware.registerPayloadCheck,
  middleware.checkEmailUnique,
  middleware.hashPassword,
  async (req, res, next) => {
    // payload
    // email unique
    // hash
    try {
      const createdUser = await UsersModel.create(req.body)
      res.status(201).json({ message: `Welcome, ${createdUser.name}` })
    } catch (error) {
      next(error)
    }
  }
)

router.post(
  '/login',
  middleware.registerPayloadCheck,
  middleware.isRegisteredUser,
  middleware.isPasswordCorrect,
  middleware.generateToken,
  async (req, res, next) => {
    // payload
    // isRegisteredUser
    // isPasswordCorrect
    //   generateToken
    try {
      res.json({ message: `Welcome, ${req.body.username}` })
    } catch (error) {
      next(error)
    }
  }
)

module.exports = router
