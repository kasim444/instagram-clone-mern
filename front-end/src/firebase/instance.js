import firebase from 'firebase'

const firebaseApp = firebase.initializeApp({
  apiKey: 'AIzaSyBbXITRLiV-ct0MvKs2Z9q6zIwmhIRioBk',
  authDomain: 'instagram-clone-5552b.firebaseapp.com',
  databaseURL: 'https://instagram-clone-5552b-default-rtdb.firebaseio.com',
  projectId: 'instagram-clone-5552b',
  storageBucket: 'instagram-clone-5552b.appspot.com',
  messagingSenderId: '793723601543',
  appId: '1:793723601543:web:6fdece8bbc7c7331dcae22',
  measurementId: 'G-6C8MZBW6QN',
})

const db = firebaseApp.firestore()
const auth = firebase.auth()
const storage = firebase.storage()

export { db, auth, storage }
