const router = require('express').Router()
const CommentsModel = require('./model')
const commentsMiddleware = require('./middleware')

router.get('/', async (req, res, next) => {
  try {
    const comment = await CommentsModel.getAllComments()
    res.json(comment)
  } catch (error) {
    next(error)
  }
})

router.get(
  '/:id',
  commentsMiddleware.checkCommentExists,
  async (req, res, next) => {
    try {
      const comment = await CommentsModel.getCommentsByFilter({
        comment_id: parseInt(req.params.id),
      })
      res.status(200).json(comment[0])
    } catch (error) {
      next(error)
    }
  }
)

router.post(
  '/',
  commentsMiddleware.checkCommentPayload,
  async (req, res, next) => {
    try {
      const { user_id } = req.decodedToken

      const { post_id, comment_text } = req.body
      const createdComment = await CommentsModel.createComment({
        comment_owner_id: user_id,
        post_id: post_id,
        comment_text: comment_text,
      })
      res.status(201).json({
        message: `comment with comment_id ${createdComment.comment_id} created`,
        createdComment,
      })
    } catch (error) {
      next(error)
    }
  }
)

router.put(
  '/:id',
  commentsMiddleware.checkCommentExists,
  commentsMiddleware.checkOwnerOfComment,
  commentsMiddleware.checkCommentPayload,
  async (req, res, next) => {
    try {
      const updatedComment = await CommentsModel.updateComment(
        req.params.id,
        req.body
      )
      res.status(200).json({
        message: `comment with comment_id ${req.params.id} updated`,
        updatedComment,
      })
    } catch (error) {
      next(error)
    }
  }
)

router.delete(
  '/:id',
  commentsMiddleware.checkCommentExists,
  commentsMiddleware.checkOwnerOfComment,
  async (req, res, next) => {
    try {
      await CommentsModel.deleteComment(req.params.id)
      res.json({
        message: `comment with comment_id ${req.params.id} deleted`,
      })
    } catch (error) {
      next(error)
    }
  }
)

module.exports = router
