import { types } from 'mobx-state-tree'

const UserModel = types
  .model({
    userName: types.optional(types.string, ''),
    email: types.optional(types.string, ''),
    isLoggedIn: types.optional(types.boolean, false),
  })
  .actions((self) => ({
    signIn(userName, email) {
      self.userName = userName
      self.email = email
      self.isLoggedIn = true
    },
    signOut() {
      self.userName = ''
      self.email = ''
      self.isLoggedIn = false
    },
  }))

export default UserModel
