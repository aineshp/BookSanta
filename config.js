import firebase from 'firebase';
require('@firebase/firestore')
var firebaseConfig = {
  apiKey: "AIzaSyAV6CZ9luleYpvAKf5lmeVN6TYnhEhz3OU",
  authDomain: "book-santa-app-e7d50.firebaseapp.com",
  databaseURL: "https://book-santa-app-e7d50.firebaseio.com",
  projectId: "book-santa-app-e7d50",
  storageBucket: "book-santa-app-e7d50.appspot.com",
  messagingSenderId: "89687014562",
  appId: "1:89687014562:web:81fbaaac774e614f806bfb"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
