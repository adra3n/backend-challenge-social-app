import * as React from 'react'
import axios from 'axios'
import { useEffect, useState } from 'react'

import { styled } from '@mui/material/styles'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardMedia from '@mui/material/CardMedia'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import Collapse from '@mui/material/Collapse'
import Avatar from '@mui/material/Avatar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import { blue } from '@mui/material/colors'
import FavoriteIcon from '@mui/icons-material/Favorite'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import './home.css'

const Home = ({ token, user }) => {
  const [posts, setPosts] = useState([])
  const [likes, setLikes] = useState([])
  const [comments, setComments] = useState([])
  const [expanded, setExpanded] = React.useState(false)

  const ExpandMore = styled((props) => {
    const { expand, ...other } = props
    return <IconButton {...other} />
  })(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  }))

  const handleExpandClick = () => {
    setExpanded(!expanded)
  }

  function getComments(postId) {
    let postComments = comments?.filter((comment) => comment.post_id === postId)
    // console.log('___testing_comments___', comments)
    // console.log('postComments', postComments)
    return postComments
  }

  function getLikesCount(postId) {
    let postLikes = likes?.filter((like) => like.post_id === postId)
    console.log('___testing_likes___', likes)
    console.log('postLikes', postLikes)
    return postLikes.length
  }

  // async function getLikesCount(postId) {
  //   let likeCount = 0
  //   axios
  //     .get(`http://localhost:9000/api/likes/count/${postId}`, {
  //       headers: {
  //         Authorization: token,
  //       },
  //     })
  //     .then((res) => {
  //       console.log('______res.data likecount______', res.data)
  //       likeCount = res.data
  //     })
  //     .catch((err) => console.log(err))
  //   return likeCount
  // }

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
    axios
      .get('http://localhost:9000/api/comments/', {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        setComments(res.data)
      })
    axios
      .get('http://localhost:9000/api/likes/', {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        setLikes(res.data)
      })
      .catch((err) => console.log(err))
  }, [])

  return (
    <div className="home_container">
      <h1>Welcome {user.username}!</h1>
      <div className="posts_container">
        {console.log('testing posts', posts)}
        {posts?.map((post) => (
          <div className="post" key={post.post_id}>
            <Card>
              <CardHeader
                avatar={
                  <Avatar sx={{ bgcolor: blue[500] }} aria-label="recipe">
                    {post.username[0]}
                  </Avatar>
                }
                title={post.username}
                subheader={post.created_at}
              />
              <CardMedia component="img" height="200" image={post.post_image} />
              <CardContent>
                <Typography variant="body2" color="text.secondary">
                  {post.post_text}
                </Typography>
              </CardContent>
              <CardActions disableSpacing>
                <IconButton aria-label="add to favorites">
                  <p className="likes__text">
                    Likes: {getLikesCount(post.post_id)}
                  </p>
                  <FavoriteIcon />
                </IconButton>
                {/* <IconButton aria-label="share">
                  <ShareIcon />
                </IconButton> */}
                <ExpandMore
                  expand={expanded}
                  onClick={handleExpandClick}
                  aria-expanded={expanded}
                  aria-label="show more"
                >
                  <ExpandMoreIcon />
                </ExpandMore>
              </CardActions>
              <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                  <Typography paragraph>
                    <h2>Comments:</h2>
                    <br />
                    <hr />
                  </Typography>
                  <div className="comments_container">
                    {getComments(post.post_id)?.map((comment) => (
                      <Typography
                        className="comment_card"
                        paragraph
                        key={comment.comment_id}
                      >
                        <p>{comment.username}: </p>
                        <p>{comment.comment_text}</p>
                      </Typography>
                    ))}
                  </div>
                </CardContent>
              </Collapse>
            </Card>
          </div>
        ))}
      </div>
    </div>
  )
}
export default Home
