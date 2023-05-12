const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const UsersModel = require('../users/model')
const Helpers = require('../helpers/helpers')
const { HASH_ROUND, JWT_SECRET } = require('../../config/config')

function hashPassword(req, res, next) {
  try {
    const { password } = req.body
    const passwordHashed = bcrypt.hashSync(password, HASH_ROUND)
    //req.body.password
    req.body.password = passwordHashed
    next()
  } catch (error) {
    next(error)
  }
}

function generateToken(req, res, next) {
  try {
    const payload = {
      user_id: req.user.user_id,
      role_id: req.user.role_id,
      username: req.user.username,
    }
    const options = {
      expiresIn: '10h',
    }
    const token = jwt.sign(payload, JWT_SECRET, options)
    //req.user.token
    req.user.token = token
    console.log(req.user, '_______req.user________')
    console.log(token, '_______token________')
    next()
  } catch (error) {
    next(error)
  }
}

async function isRegisteredUser(req, res, next) {
  try {
    const { username } = req.body
    const user = await UsersModel.getUsersByFilter({
      username: username,
    })
    if (user.length > 0) {
      //req.user
      req.user = user[0]
      next()
    } else {
      res.json({ message: 'Invalid Credentials' })
    }
  } catch (error) {
    next(error)
  }
}

async function checkIfUnique(req, res, next) {
  try {
    const { username, email } = req.body
    const userByUsername = await UsersModel.getUsersByFilter({
      username: username,
    })
    const userByEmail = await UsersModel.getUsersByFilter({ email: email })
    if (userByUsername.length > 0 || userByEmail.length > 0) {
      res.json({ message: 'Username or Email Already Exists' })
    } else {
      next()
    }
  } catch (error) {
    next(error)
  }
}

function authorizationCheck(req, res, next) {
  try {
    const token = req.headers.authorization
    if (token) {
      jwt.verify(token, JWT_SECRET, (error, decodedToken) => {
        if (error) {
          res.status(401).json({ message: 'Invalid Token' })
        } else {
          //req.decodedToken
          req.decodedToken = decodedToken
          console.log(decodedToken, '_______decodedToken________')

          next()
        }
      })
    } else {
      res.json({ message: 'No Token! Login or Register Please..' })
    }
  } catch (error) {
    next(error)
  }
}

function registerPayloadCheck(req, res, next) {
  try {
    const { password, username, email } = req.body
    if (!password || password.trim().length < 4) {
      res.json({ message: 'Not a proper password' })
    } else if (!username || username.trim().length < 4) {
      res.json({ message: 'Not a proper username' })
    } else if (!email || !Helpers.checkEmail(email)) {
      res.json({ message: 'Not a proper email' })
    } else {
      next()
    }
  } catch (error) {
    next(error)
  }
}

function checkRole(req, res, next) {
  //role_id:1 = user
  //role_id:2 = admin
  try {
    const { role_id } = req.decodedToken
    if (role_id == 2) {
      next()
    } else {
      res.status(403).json({ message: 'Not authorized' })
    }
  } catch (error) {
    next(error)
  }
}

function isPasswordCorrect(req, res, next) {
  try {
    if (bcrypt.compareSync(req.body.password, req.user.password)) {
      next()
    } else {
      res.json({ message: 'Invalid Credentials' })
    }
  } catch (error) {
    next(error)
  }
}

module.exports = {
  generateToken,
  checkIfUnique,
  checkRole,
  registerPayloadCheck,
  authorizationCheck,
  hashPassword,
  isPasswordCorrect,
  isRegisteredUser,
}
