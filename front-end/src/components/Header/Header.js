import React from 'react'
import './header.css'
import LogoSrc from '../../assets/images/instagram_logo.png'
import { observer } from 'mobx-react-lite'
import { useStore } from '../../store/root'
import Button from '@material-ui/core/Button'
import { auth } from '../../firebase/instance'
import Avatar from '@material-ui/core/Avatar'

const Header = observer(() => {
  const { userStore, uiStore } = useStore()

  const signOut = () => {
    auth
      .signOut()
      .then(function () {
        // Sign-out successful
        userStore.signOut()
      })
      .catch(function (error) {
        console.log(`sign out error: ${JSON.stringify(error, null, 2)}`)
        // An error happened.
      })
  }

  return (
    <div className='header'>
      <div className='header__inner'>
        <img className='header__logo' src={LogoSrc} alt='Instagram Logo' />
        {userStore.isLoggedIn ? (
          <div className='header__navButtonGroup'>
            <Avatar className='header__profileAvatar'>
              {userStore.userName[0].toUpperCase()}
            </Avatar>
            {/* <img
              className='header__profileAvatar'
              src={AvatarSrc}
              alt='Profile Avatar'
            /> */}
            <Button
              variant='outlined'
              color='primary'
              onClick={() => uiStore.setNewPostModalOpened(true)}>
              New Post
            </Button>
            <Button variant='contained' color='primary' onClick={signOut}>
              Log Out
            </Button>
          </div>
        ) : (
          <div className='header__navButtonGroup'>
            <Button
              variant='contained'
              color='primary'
              onClick={() => uiStore.setSignInModalOpened(true)}>
              Sign In
            </Button>
            <Button
              variant='outlined'
              color='primary'
              onClick={() => uiStore.setSignUpModalOpened(true)}>
              Sign Up
            </Button>
          </div>
        )}
      </div>
    </div>
  )
})

export default Header
