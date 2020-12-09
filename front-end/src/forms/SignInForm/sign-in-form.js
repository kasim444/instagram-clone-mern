import React, { useState } from 'react'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import { observer } from 'mobx-react-lite'
import { useStore } from '../../store/root'
import { auth } from '../../firebase/instance'
import LogoSrc from '../../assets/images/instagram_logo.png'
import Alert from '@material-ui/lab/Alert'

const SignInForm = observer(() => {
  const { uiStore, userStore } = useStore()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const handleSignIn = async (e) => {
    e.preventDefault()
    auth
      .signInWithEmailAndPassword(email, password)
      .then((authUser) => {
        // Signed in
        userStore.signIn(authUser.user.displayName || '', email)
        uiStore.setSignInModalOpened(false)
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
          Sign In
        </Button>
        <div>
          Don't have an account?
          <Button
            onClick={() => {
              uiStore.setSignInModalOpened(false)
              uiStore.setSignUpModalOpened(true)
            }}
            color='primary'>
            Sign Up
          </Button>
        </div>
      </DialogActions>
    </form>
  )
})

export default SignInForm
