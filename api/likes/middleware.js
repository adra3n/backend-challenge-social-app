const LikesModel = require('./model')

async function checkLikeExistsOnPost(req, res, next) {
  try {
    const { id } = req.params
    const like = await LikesModel.getLikeByPostId(id)
    if (like) {
      next()
    } else {
      res.status(404).json({ message: 'Like not found' })
    }
  } catch (error) {
    next(error)
  }
}

async function checkOwnerOfLike(req, res, next) {
  try {
    const { id } = req.params
    const like = await LikesModel.getLikeByPostId(id)
    if (like.like_owner_id == req.decodedToken.user_id) {
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
  checkLikeExistsOnPost,
  checkOwnerOfLike,
}
