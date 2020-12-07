import React from 'react'
import Dialog from '@material-ui/core/Dialog'
import { observer } from 'mobx-react-lite'
import { useStore } from '../../store/root'
import { SignInForm, SignUpForm, NewPostForm } from '../../forms'
import './modal.css'

const Modal = observer(() => {
  const { uiStore } = useStore()

  const getForm = () => {
    switch (uiStore.modalType) {
      case 'signIn':
        return <SignInForm />
      case 'signUp':
        return <SignUpForm />
      case 'newPost':
        return <NewPostForm />
      default:
        return <SignInForm />
    }
  }

  return (
    <Dialog
      open={uiStore.isOpenedModal}
      onClose={() =>
        uiStore.modalType === 'signIn'
          ? uiStore.setSignInModalOpened(false)
          : uiStore.setSignUpModalOpened(false)
      }
      maxWidth='sm'
      fullWidth={true}>
      {getForm()}
    </Dialog>
  )
})

export default Modal
