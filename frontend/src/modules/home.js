import React from 'react'
import Post from './post'
import axios from 'axios'
import { useEffect, useState } from 'react'

const Home = ({ token, user }) => {
  //tüm postları al ve sırala
  //postları maple
  const [posts, setPosts] = useState([])
  useEffect(() => {
    console.log('axios token')
    console.log(token)
    axios
      .get('http://localhost:9000/api/posts/', {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        setPosts(res.data)
      })
      .catch((err) => console.log(err))
  }, [])

  return (
    <div>
      <h1>Welcome {user.username}!</h1>
      <div className="posts-container">
        {console.log('testing posts', posts)}
        {posts?.map((post) => (
          <div className="post">
            <Post user={user} posts={posts} />
            <p>{post.post_text}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
export default Home
