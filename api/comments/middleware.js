const CommentsModel = require('./model')

async function checkCommentExists(req, res, next) {
  try {
    const { id } = req.params
    const comment = await CommentsModel.getCommentById(id)
    if (comment) {
      req.comment = comment
      next()
    } else {
      res.status(404).json({ message: 'Comment not found' })
    }
  } catch (error) {
    next(error)
  }
}

async function checkOwnerOfComment(req, res, next) {
  try {
    const { id } = req.params
    const comment = await CommentsModel.getCommentById(id)
    if (comment.comment_owner_id == req.decodedToken.user_id) {
      next()
    } else {
      res
        .status(403)
        .json({ message: 'You re not authorized for that action!' })
    }
  } catch (error) {
    next(error)
  }
}

async function checkCommentPayload(req, res, next) {
  const { comment_text, post_id } = req.body
  if (!comment_text) {
    res.status(400).json({ message: 'Comment text is required' })
  } else if (!post_id) {
    res.status(400).json({ message: 'Post id is required' })
  } else {
    next()
  }
}

module.exports = {
  checkCommentExists,
  checkOwnerOfComment,
  checkCommentPayload,
}
