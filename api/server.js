const express = require('express')
const server = express()

const middleware = require('./auth/middleware')

server.use(express.json())

const usersRouter = require('./users/router')
const authRouter = require('./auth/router')
const commentsRouter = require('./comments/router')
const postsRouter = require('./posts/router')
const likesRouter = require('./likes/router')

server.use('/api/auth', authRouter)

server.use('/api/users', middleware.protected, usersRouter)

server.use('/api/comments', middleware.protected, commentsRouter)

server.use('/api/posts', middleware.protected, postsRouter)

server.use('/api/likes', middleware.protected, likesRouter)

module.exports = server
