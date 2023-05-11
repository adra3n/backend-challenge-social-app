const router = require('express').Router()
const PostsModel = require('./model')
const authMiddleware = require('../auth/middleware')
const postsMiddleware = require('./middleware')

router.get('/', async (req, res, next) => {
  try {
    const posts = await PostsModel.getAllPosts()
    res.json(posts)
  } catch (error) {
    next(error)
  }
})

router.get('/:id', postsMiddleware.checkPostsExists, async (req, res, next) => {
  const post = await PostsModel.getPostById(req.params.id)
  res.json(post)
})

router.post('/', async (req, res, next) => {
  try {
    const { user_id } = req.decodedToken
    const { post_text } = req.body
    const createdPost = await PostsModel.createPost({
      user_id: user_id,
      post_text: post_text,
    })
    res.status(201).json(createdPost)
  } catch (error) {
    next(error)
  }
})

router.put(
  '/:id',
  postsMiddleware.checkPostsExists,
  authMiddleware.checkOwner,
  async (req, res, next) => {
    try {
      const updatedPost = await PostsModel.updatePost(req.params.id, req.body)
      res.json(updatedPost)
    } catch (error) {
      next(error)
    }
  }
)

router.delete(
  '/:id',
  postsMiddleware.checkPostsExists,
  authMiddleware.checkOwner,
  async (req, res, next) => {
    try {
      const deletedPost = await PostsModel.deletePost(req.params.id)
      res.json(deletedPost)
    } catch (error) {
      next(error)
    }
  }
)

module.exports = router
