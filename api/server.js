const express = require('express')
const server = express()

const authMiddleware = require('./auth/middleware')

server.use(express.json())

const usersRouter = require('./users/router')
const authRouter = require('./auth/router')
const commentsRouter = require('./comments/router')
const postsRouter = require('./posts/router')
const likesRouter = require('./likes/router')
const adminRouter = require('./admin/router')

server.use('/api/auth', authRouter)

server.use('/api/users', authMiddleware.protected, usersRouter)

server.use('/api/comments', authMiddleware.protected, commentsRouter)

server.use('/api/posts', authMiddleware.protected, postsRouter)

server.use('/api/likes', authMiddleware.protected, likesRouter)

server.use(
  '/api/admin',
  authMiddleware.protected,
  authMiddleware.checkRole,
  adminRouter
)

module.exports = server
