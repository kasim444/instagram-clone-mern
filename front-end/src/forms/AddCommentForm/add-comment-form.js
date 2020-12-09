import React, { useState } from 'react'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import CardActions from '@material-ui/core/CardActions'
import './add-comment-form.css'
import firebase from 'firebase'
import { db } from '../../firebase/instance'
import { observer } from 'mobx-react-lite'
import { useStore } from '../../store/root'

const AddCommentForm = observer(({ postId }) => {
  const { userStore } = useStore()
  const [comment, setComment] = useState('')

  const handleShareComment = (e) => {
    e.preventDefault()
    db.collection('posts').doc(postId).collection('comments').add({
      text: comment,
      username: userStore.userName,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    })
    setComment('')
  }

  return (
    <CardActions className='add-comment-form-container'>
      <form onSubmit={handleShareComment} className='add-comment-form'>
        <Grid container>
          <Grid item xs={10} sm={10}>
            <TextField
              margin='dense'
              label='Add a comment...'
              type='text'
              fullWidth
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
          </Grid>
          <Grid item xs={2} sm={2}>
            <Button color='primary' type='submit'>
              Share
            </Button>
          </Grid>
        </Grid>
      </form>
    </CardActions>
  )
})

export default AddCommentForm
