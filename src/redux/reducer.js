import { combineReducers } from 'redux'

import { firebaseReducer } from 'react-redux-firebase'
import { firestoreReducer } from 'redux-firestore'

const initialChatMessages = []

export default combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer,
  chatMessages: function(state = initialChatMessages, action) {
    switch (action.type) {
      case 'CHAT_MESSAGE_PUSH':
        return state.concat([action.payload])
      default:
        return state
    }
  }
})
