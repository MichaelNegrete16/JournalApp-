// Import the functions you need from the SDKs you need
import firebase from "firebase/app";
import 'firebase/firestore'
import 'firebase/auth'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB2PiZ2jbk5iyPeBiSnjaJWj0ijpErpkUg",
  authDomain: "react-app-journal-433b2.firebaseapp.com",
  projectId: "react-app-journal-433b2",
  storageBucket: "react-app-journal-433b2.appspot.com",
  messagingSenderId: "634480103463",
  appId: "1:634480103463:web:efd28487e677de19a47e02"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore()
const googleAuthProvider = new firebase.auth.GoogleAuthProvider()

export {
    db,
    googleAuthProvider,
    firebase
}