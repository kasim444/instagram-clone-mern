import React, { useState } from 'react'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContentText from '@material-ui/core/DialogContentText'
import { observer } from 'mobx-react-lite'
import LogoSrc from '../../assets/images/instagram_logo.png'
import { useStore } from '../../store/root'
import { auth } from '../../firebase/instance'
import Alert from '@material-ui/lab/Alert'

const SignUpForm = observer(() => {
  const { uiStore, userStore } = useStore()
  const [userName, setUserName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const handleSignIn = async (e) => {
    e.preventDefault()
    auth
      .createUserWithEmailAndPassword(email, password)
      .then(async (authUser) => {
        // Signed in
        userStore.signIn(userName, email)
        uiStore.setSignInModalOpened(false)
        return authUser.user.updateProfile({
          displayName: userName,
        })
      })
      .catch(({ code, message }) => {
        setErrorMessage(message)
      })
  }

  return (
    <form onSubmit={handleSignIn}>
      <DialogTitle disableTypography={true}>
        <img src={LogoSrc} alt='Instagram Logo' />
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          Sign up to see photos and videos of your friends.
        </DialogContentText>
        <TextField
          autoFocus
          margin='dense'
          id='username'
          label='Username'
          type='text'
          fullWidth
          onChange={(e) => setUserName(e.target.value)}
        />
        <TextField
          margin='dense'
          id='email'
          label='Email address'
          type='email'
          fullWidth
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          margin='dense'
          id='password'
          label='Password'
          type='password'
          fullWidth
          onChange={(e) => setPassword(e.target.value)}
        />
        {errorMessage !== '' && (
          <Alert variant='outlined' severity='error'>
            {errorMessage}
          </Alert>
        )}
      </DialogContent>
      <DialogActions>
        <Button variant='contained' color='primary' type='submit'>
          Sign Up
        </Button>
        <div>
          Do you have an account?
          <Button
            onClick={() => {
              uiStore.setSignUpModalOpened(false)
              uiStore.setSignInModalOpened(true)
            }}
            color='primary'>
            Sign In
          </Button>
        </div>
      </DialogActions>
    </form>
  )
})

export default SignUpForm
