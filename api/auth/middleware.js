const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const UsersModel = require('../users/model')
const { HASH_ROUND, JWT_SECRET } = require('../../config/config')

function registerPayloadCheck(req, res, next) {
  try {
    const { password, username, email } = req.body
    if (!password || password.trim().length < 6) {
      res.json({ message: 'Not a proper password' })
    } else if (!username || username.trim().length < 4) {
      res.json({ message: 'Not a proper username' })
    } else if (!email || !checkEmail(email)) {
      res.json({ message: 'Not a proper email' })
    } else {
      next()
    }
  } catch (error) {
    next(error)
  }
}

function protected(req, res, next) {
  try {
    const token = req.headers.authorization
    if (token) {
      jwt.verify(token, JWT_SECRET, (error, decodedToken) => {
        if (error) {
          res.json({ message: 'Invalid Token' })
        } else {
          req.decodedToken = decodedToken
          next()
        }
      })
    } else {
      res.json({ message: 'No Token' })
    }
  } catch (error) {
    next(error)
  }
}

async function isRegisteredUser(req, res, next) {
  try {
    const { username } = req.body
    const user = await UsersModel.getUsersByFilter('username', username).first()
    if (user) {
      req.user = user
      next()
    } else {
      res.json({ message: 'Invalid Credentials' })
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

function checkOwner(req, res, next) {
  try {
    if (req.decodedToken.user_id == req.body.user_id) {
      next()
    } else {
      res.status(403).json({ message: 'Not the owner' })
    }
  } catch (error) {
    next(error)
  }
}

async function checkEmailUnique(req, res, next) {
  try {
    const { email } = req.body
    const user = await UsersModel.getUsersByFilter({ email: email })
    if (user) {
      res.json({ message: 'Email already exists' })
    } else {
      next()
    }
  } catch (error) {
    next(error)
  }
}

function checkEmail(req, res, next) {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    )
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

function hashPassword(req, res, next) {
  try {
    const { password } = req.body
    const passwordHashed = bcrypt.hashSync(password, HASH_ROUND)
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
      expiresIn: '8h',
    }
    const token = jwt.sign(payload, JWT_SECRET, options)
    req.user.token = token
    next()
  } catch (error) {
    next(error)
  }
}

module.exports = {
  generateToken,
  checkEmail,
  checkEmailUnique,
  checkRole,
  registerPayloadCheck,
  protected,
  hashPassword,
  isPasswordCorrect,
  isRegisteredUser,
  checkOwner,
}
