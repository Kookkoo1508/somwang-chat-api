import firebase from "firebase";
//import firestore from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyDn5WCZxo1PkADJX3Gor8DRAPTBVzwbhKc",
  authDomain: "somwang-chat-app.firebaseapp.com",
  databaseURL: "https://somwang-chat-app.firebaseio.com",
  projectId: "somwang-chat-app",
  storageBucket: "somwang-chat-app.appspot.com",
  messagingSenderId: "504581288629",
  appId: "1:504581288629:web:47f6e952be6f01dd0084fc"
};
// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);

export default firebaseApp.firestore();
