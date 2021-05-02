
import firebase from 'firebase'

const  firebaseApp = firebase.initializeApp ({
  apiKey: "AIzaSyBFb8vMYQNjCRBWmKcg4T3EVmJv5XPrXKY",
  authDomain: "jobify-a7a4a.firebaseapp.com",
  projectId: "jobify-a7a4a",
  storageBucket: "jobify-a7a4a.appspot.com",
  messagingSenderId: "544886424623",
  appId: "1:544886424623:web:d9d28411ec557e985372da",
  measurementId: "G-81D9WRYSH9"
});

const db= firebaseApp.firestore()
const Fire = firebaseApp
export  {db, Fire}
