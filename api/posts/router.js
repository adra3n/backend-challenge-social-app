const router = require('express').Router()
const PostsModel = require('./model')
const middleware = require('../auth/middleware')

router.get('/', async (req, res, next) => {
  try {
    const posts = await PostsModel.getAll()
    res.json(posts)
  } catch (error) {
    next(error)
  }
})

router.get('/:id', async (req, res, next) => {
  const post = await PostsModel.getPostById(req.params.id).first()
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

router.delete('/:id', middleware.checkOwner, async (req, res, next) => {
  try {
    const deletedPost = await PostsModel.deletePost(req.params.id)
    res.json(deletedPost)
  } catch (error) {
    next(error)
  }
})

module.exports = router
