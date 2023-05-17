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
  const [likes, setLikes] = useState(0)
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
    console.log('___testing_comments___', comments)
    console.log('postComments', postComments)
    return postComments
  }

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
                  <p>Likes: {getLikes(post.post_id)}</p>
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
                  {/* <Typography paragraph>
                    Heat 1/2 cup of the broth in a pot until simmering, add
                    saffron and set aside for 10 minutes.
                  </Typography>
                  <Typography paragraph>
                    Heat oil in a (14- to 16-inch) paella pan or a large, deep
                    skillet over medium-high heat. Add chicken, shrimp and
                    chorizo, and cook, stirring occasionally until lightly
                    browned, 6 to 8 minutes. Transfer shrimp to a large plate
                    and set aside, leaving chicken and chorizo in the pan. Add
                    pimentón, bay leaves, garlic, tomatoes, onion, salt and
                    pepper, and cook, stirring often until thickened and
                    fragrant, about 10 minutes. Add saffron broth and remaining
                    4 1/2 cups chicken broth; bring to a boil.
                  </Typography>
                  <Typography paragraph>
                    Add rice and stir very gently to distribute. Top with
                    artichokes and peppers, and cook without stirring, until
                    most of the liquid is absorbed, 15 to 18 minutes. Reduce
                    heat to medium-low, add reserved shrimp and mussels, tucking
                    them down into the rice, and cook again without stirring,
                    until mussels have opened and rice is just tender, 5 to 7
                    minutes more. (Discard any mussels that don&apos;t open.)
                  </Typography>
                  <Typography>
                    Set aside off of the heat to let rest for 10 minutes, and
                    then serve.
                  </Typography> */}
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
