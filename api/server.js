const express = require('express')
const server = express()

const authMiddleware = require('./auth/middleware')

server.use(express.json())

const cors = require('cors')

server.use(cors())

const usersRouter = require('./users/router')
const authRouter = require('./auth/router')
const commentsRouter = require('./comments/router')
const postsRouter = require('./posts/router')
const likesRouter = require('./likes/router')
const adminRouter = require('./admin/router')

server.use('/api/auth', authRouter)

server.use('/api/users', authMiddleware.authorizationCheck, usersRouter)

server.use('/api/comments', authMiddleware.authorizationCheck, commentsRouter)

server.use('/api/posts', authMiddleware.authorizationCheck, postsRouter)

server.use('/api/likes', authMiddleware.authorizationCheck, likesRouter)

server.use(
  '/api/admin',
  authMiddleware.authorizationCheck,
  authMiddleware.checkRole,
  adminRouter
)

server.use((error, req, res, next) => {
  res
    .status(error.status || 500)
    .json({ message: error.message || 'server error' })
})

module.exports = server
