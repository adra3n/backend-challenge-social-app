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

module.exports = {
  checkPostsExists,
}
