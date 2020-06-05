import firebase from 'firebase';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "remote-roofing-moviebox.firebaseapp.com",
  databaseURL: "https://remote-roofing-moviebox.firebaseio.com",
  projectId: "remote-roofing-moviebox",
  storageBucket: "remote-roofing-moviebox.appspot.com",
  messagingSenderId: "265819966226",
  appId: "1:265819966226:web:9d297f0aeefa6a446781cb",
  measurementId: "G-8VJX4CW506"
};

firebase.initializeApp(firebaseConfig);