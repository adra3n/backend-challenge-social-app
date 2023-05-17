const router = require('express').Router()
const LikesModel = require('./model')
const likesMiddleware = require('./middleware')
const postsMiddleware = require('../posts/middleware')

// router.get('/', async (req, res, next) => {
//   try {
//     const likes = await LikesModel.getAllLikes()
//     res.json(likes)
//   } catch (error) {
//     next(error)
//   }
// })

// router.get('/:post_id', async (req, res, next) => {
//   const like = await LikesModel.getLikeByPostId(parseInt(req.params.post_id))
//   if (!like) {
//     res.status(404).json({
//       message: `like with id ${req.params.post_id} not found`,
//     })
//   }
//   res.json(like)
// })

router.get('/count/:post_id', async (req, res, next) => {
  const likeCount = await LikesModel.getLikeCount(parseInt(req.params.post_id))
  if (!likeCount) {
    res.status(404).json({
      message: `no like found for post id ${req.params.post_id}`,
    })
  }
  res.json({
    message: `like count for post id:${req.params.post_id} is ${likeCount} `,
    likeCount,
  })
})

router.post(
  '/:post_id',
  postsMiddleware.checkPostsExists,
  async (req, res, next) => {
    try {
      const { user_id } = req.decodedToken
      const { post_id } = req.params

      const createdLike = await LikesModel.createLike({
        like_owner_id: user_id,
        post_id: post_id,
      })
      res.status(201).json({
        message: `liked post with id ${post_id} `,
        createdLike,
      })
      next()
    } catch (error) {
      next(error)
    }
  }
)

router.delete(
  '/:post_id',
  postsMiddleware.checkPostsExists,
  likesMiddleware.checkLikeExistsOnPost,
  likesMiddleware.checkOwnerOfLike,
  async (req, res, next) => {
    try {
      const { post_id } = req.params

      const like = await LikesModel.getLikeByPostId(post_id)

      await LikesModel.deleteLike(like.like_id)
      res.json({
        message: `unliked post with id ${post_id}`,
      })
    } catch (error) {
      next(error)
    }
  }
)

module.exports = router
