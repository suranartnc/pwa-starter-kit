import { compose, createStore } from 'redux'
import firebase from 'firebase/app'

import 'firebase/auth'
import 'firebase/database'
import 'firebase/firestore'

import { reactReduxFirebase } from 'react-redux-firebase'
import { reduxFirestore } from 'redux-firestore'

import rootReducer from './reducer'

const firebaseConfig = {
  apiKey: 'AIzaSyCmLWUVd3nRKn0ZNmBF-m955_fGRsaNQyQ',
  authDomain: 'pwa-starter-kit-b97bc.firebaseapp.com',
  databaseURL: 'https://pwa-starter-kit-b97bc.firebaseio.com',
  projectId: 'pwa-starter-kit-b97bc',
  storageBucket: 'pwa-starter-kit-b97bc.appspot.com',
  messagingSenderId: '516954074362'
}

const rrfConfig = {
  userProfile: 'users',
  useFirestoreForProfile: true
}

firebase.initializeApp(firebaseConfig)
firebase.firestore().settings({ timestampsInSnapshots: true })

const createStoreWithFirebase = compose(
  reduxFirestore(firebase),
  reactReduxFirebase(firebase, rrfConfig)
)(createStore)

const initialState = {}
const store = createStoreWithFirebase(rootReducer, initialState)

export default store
