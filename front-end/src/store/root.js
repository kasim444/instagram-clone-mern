import { useContext, createContext } from 'react'
import { types, onSnapshot } from 'mobx-state-tree'
import UserModel from './user-model'
import UiModel from './ui-model'

const RootModel = types.model({
  userStore: UserModel,
  uiStore: UiModel,
})

export const rootStore = RootModel.create({
  userStore: {
    userName: 'willsmith',
    email: '',
    isLoggedIn: false,
  },
  uiStore: {
    modalType: 'signIn',
    isOpenedModal: false,
    isOpenedBackdrop: false,
  },
})

onSnapshot(rootStore, (snapshot) => {
  console.log('Snapshot: ', snapshot)
})

const RootStoreContext = createContext(null)
export const Provider = RootStoreContext.Provider
export const useStore = () => {
  const store = useContext(RootStoreContext)
  if (store === null) {
    throw new Error('Store cannot be null, please add a context provider')
  }
  return store
}
