import React from 'react'
import Comment from './comment'
const post = ({ user, posts }) => {
  //commentler maplenecek
  //like sayısı gösterilecek
  //like butonu olacak
  //comment ekleme butonu olacak
  const likes = 0

  return (
    <div>
      <div className="post-header">
        <img src={posts?.post_image} alt="profile" />
        <p>{user.username}</p>
      </div>
    </div>
  )
}

export default post
