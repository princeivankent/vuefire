import firebase from 'firebase'

//--> Production
// import firebase from 'firebase'
// import 'firebase/firestore'
// import 'firebase/auth'

const config = {
  apiKey: "AIzaSyCzbCxRk9ognu8iXctoegk1ptf87toSVr0",
  authDomain: "socialite-pkdev.firebaseapp.com",
  databaseURL: "https://socialite-pkdev.firebaseio.com",
  projectId: "socialite-pkdev",
  storageBucket: "",
  messagingSenderId: "77660681027",
  appId: "1:77660681027:web:4a146dd36120722b"
}

firebase.initializeApp(config);

// firebase utils
const db = firebase.firestore()
const auth = firebase.auth()
const currentUser = auth.currentUser

// firebase collections
const usersCollection = db.collection('users')
const postsCollection = db.collection('posts')

export {
  db,
  auth,
  currentUser,
  usersCollection,
  postsCollection
}
