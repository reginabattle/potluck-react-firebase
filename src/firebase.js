import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'

// configuration
const config = {
  apiKey: "AIzaSyAqUZoAWRwTqKlH6dYPK9SB-FeORuylt0g",
  authDomain: "potluck-app-b252b.firebaseapp.com",
  databaseURL: "https://potluck-app-b252b.firebaseio.com",
  projectId: "potluck-app-b252b",
  storageBucket: "potluck-app-b252b.appspot.com",
  messagingSenderId: "246451418927",
  appId: "1:246451418927:web:b28ce1193ac1f28f8ed3da"
}

let firebaseCache

export const getFirebase = () => {
  if (firebaseCache) {
    return firebaseCache
  }

  firebase.initializeApp(config)
  firebaseCache = firebase
  return firebase
}

export const provider = new firebase.auth.GoogleAuthProvider()
export const auth = getFirebase().auth()
