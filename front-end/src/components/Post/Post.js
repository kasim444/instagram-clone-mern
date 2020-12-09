/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardMedia from '@material-ui/core/CardMedia'
import CardContent from '@material-ui/core/CardContent'
import Avatar from '@material-ui/core/Avatar'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz'
import './post.css'
import { db } from '../../firebase/instance'
import { AddCommentForm } from '../../forms'
import { observer } from 'mobx-react-lite'
import { useStore } from '../../store/root'

const Post = observer(({ postId, username, caption, imageUrl }) => {
  const [comments, setComments] = useState([])
  const { userStore } = useStore()

  useEffect(() => {
    let unsubscribe
    if (postId) {
      unsubscribe = db
        .collection('posts')
        .doc(postId)
        .collection('comments')
        .orderBy('timestamp', 'desc')
        .onSnapshot((snapshot) => {
          setComments(snapshot.docs.map((doc) => doc.data()))
        })
    }
  }, [postId])

  return (
    <Card className='post'>
      <CardHeader
        avatar={<Avatar>{username[0].toUpperCase()}</Avatar>}
        action={
          <IconButton aria-label='settings'>
            <MoreHorizIcon />
          </IconButton>
        }
        title={username}
      />
      <CardMedia image={imageUrl} title={caption} className='post__media' />
      <CardContent>
        <Typography variant='body2' component='p' className='post__comment'>
          <b>{username}</b> {caption}
        </Typography>
        {comments.map(({ username, text }, i) => (
          <Typography
            key={i}
            variant='body2'
            component='p'
            className='post__comment'>
            <b>{username}</b> {text}
          </Typography>
        ))}
      </CardContent>
      {userStore.isLoggedIn && <AddCommentForm postId={postId} />}
    </Card>
  )
})

export default Post
