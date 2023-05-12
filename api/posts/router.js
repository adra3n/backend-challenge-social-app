const router = require('express').Router()
const PostsModel = require('./model')
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

router.post('/', postsMiddleware.checkPostPayload, async (req, res, next) => {
  try {
    const { user_id } = req.decodedToken
    const { post_text, post_image } = req.body
    if (
      post_image &&
      !post_image === undefined &&
      post_image !== null &&
      post_image !== ''
    ) {
      let createdPostWithImg = await PostsModel.createPost({
        user_id: parseInt(user_id),
        post_text: post_text,
        post_image: post_image,
      })
      res.status(201).json(createdPostWithImg)
    } else {
      let createdPost = await PostsModel.createPost({
        user_id: parseInt(user_id),
        post_text: post_text,
      })
      res.status(201).json({
        createdPost,
        message: `created post with id ${createdPost.post_id}`,
      })
    }
  } catch (error) {
    next(error)
  }
})

router.put(
  '/:id',
  postsMiddleware.checkPostsExists,
  postsMiddleware.checkOwnerOfPost,
  postsMiddleware.checkPostPayload,
  async (req, res, next) => {
    try {
      const oldPost = await PostsModel.getPostById(req.params.id)
      const newPost = {
        post_text: req.post.post_text,
        post_id: req.params.id,
        user_id: oldPost.user_id,
        post_image: req.post.post_image
          ? req.post.post_image
          : oldPost.post_image,
        created_at: oldPost.created_at,
        updated_at: new Date().toISOString(),
      }

      const updatedPost = await PostsModel.updatePost(req.params.id, newPost)
      res.json({
        updatedPost,
        message: `updated post with id ${req.params.id}`,
      })
    } catch (error) {
      next(error)
    }
  }
)

router.delete(
  '/:id',
  postsMiddleware.checkPostsExists,
  postsMiddleware.checkOwnerOfPost,
  async (req, res, next) => {
    try {
      await PostsModel.deletePost(req.params.id)
      res.json({
        message: `deleted post with id ${req.params.id}`,
      })
    } catch (error) {
      next(error)
    }
  }
)

module.exports = router
