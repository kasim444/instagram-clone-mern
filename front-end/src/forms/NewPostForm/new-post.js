import { observer } from 'mobx-react-lite'
import React, { useState } from 'react'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import Fab from '@material-ui/core/Fab'
import DialogTitle from '@material-ui/core/DialogTitle'
import { CircularProgressWithLabel } from '../../components'
import AddPhotoAlternateIcon from '@material-ui/icons/AddPhotoAlternate'
import { db, storage } from '../../firebase/instance'
import firebase from 'firebase'
import Alert from '@material-ui/lab/Alert'
import { useStore } from '../../store/root'

const NewPostForm = observer(() => {
  const { userStore, uiStore } = useStore()
  const [image, setImage] = useState(null)
  const [progress, setProgress] = useState(0)
  const [caption, setCaption] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const handleChangeImage = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0])
    }
  }

  const handleUpload = (e) => {
    e.preventDefault()
    const uploadTask = storage.ref(`images/${image.name}`).put(image)
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        // progress function
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        )
        setProgress(progress)
      },
      (error) => {
        // error function
        console.log(`upload error: ${JSON.stringify(error.message)}`)
        setErrorMessage(error.message)
      },
      () => {
        // complete function
        storage
          .ref('images')
          .child(image.name)
          .getDownloadURL()
          .then((url) => {
            // post image inside db
            db.collection('posts').add({
              timestamp: firebase.firestore.FieldValue.serverTimestamp(),
              caption: caption,
              imageUrl: url,
              username: userStore.userName,
            })

            setProgress(0)
            setCaption(0)
            setImage(null)
            uiStore.setNewPostModalOpened(false)
          })
      }
    )
  }

  return (
    <form onSubmit={handleUpload}>
      <DialogTitle>New Post</DialogTitle>
      <DialogContent>
        <label htmlFor='contained-button-file' className='upload-file'>
          <Fab component='span' className='upload-file__icon'>
            <AddPhotoAlternateIcon />
          </Fab>
        </label>
        <input
          style={{ display: 'none' }}
          id='contained-button-file'
          name='contained-button-file'
          type='file'
          onChange={handleChangeImage}
        />
        <TextField
          margin='dense'
          id='caption'
          label='Caption'
          type='text'
          fullWidth
          onChange={(e) => setCaption(e.target.value)}
        />
        {errorMessage !== '' && (
          <Alert variant='outlined' severity='error'>
            {errorMessage}
          </Alert>
        )}
      </DialogContent>
      <DialogActions>
        <Button variant='contained' color='primary' type='submit'>
          Upload post
        </Button>
        <CircularProgressWithLabel value={progress} />
      </DialogActions>
    </form>
  )
})

export default NewPostForm
