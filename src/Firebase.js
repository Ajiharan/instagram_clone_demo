import firebase from "firebase";
const firebaseConfig = firebase.initializeApp({
  apiKey: "AIzaSyB8BJYHpg5zuAO8LU4zzvmEgec0ezE4Jos",
  authDomain: "instagram-clone-25104.firebaseapp.com",
  databaseURL: "https://instagram-clone-25104.firebaseio.com",
  projectId: "instagram-clone-25104",
  storageBucket: "instagram-clone-25104.appspot.com",
  messagingSenderId: "1003770674422",
  appId: "1:1003770674422:web:7a633332d7023541b680d7",
  measurementId: "G-FQBX766JRF",
});

const db = firebaseConfig.firestore();
const auth = firebaseConfig.auth();
const storage = firebaseConfig.storage();

export { db, auth, storage };
