const PostsModel = require('./model')

async function checkPostsExists(req, res, next) {
  try {
    const { id } = req.params
    const post = await PostsModel.getPostById(id)
    if (post) {
      req.user = post
      next()
    } else {
      res.status(404).json({ message: 'Post not found' })
    }
  } catch (error) {
    next(error)
  }
}

async function checkPostPayload(req, res, next) {
  const { post_text, post_image } = req.body
  if (
    post_text &&
    post_text !== undefined &&
    post_text !== null &&
    post_text !== ''
  ) {
    // req.post
    req.post = req.body
    next()
  } else {
    res.status(400).json({ message: 'Post text is required' })
  }
}

async function checkOwnerOfPost(req, res, next) {
  try {
    const { id } = req.params
    const post = await PostsModel.getPostById(id)
    if (post.user_id == req.decodedToken.user_id) {
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

module.exports = {
  checkPostsExists,
  checkOwnerOfPost,
  checkPostPayload,
}
