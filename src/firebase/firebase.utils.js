import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyCPVNckaGe-2r5CKjJod_N-kYIrlHRXxRU",
  authDomain: "shaajposhak.firebaseapp.com",
  databaseURL: "https://shaajposhak.firebaseio.com",
  projectId: "shaajposhak",
  storageBucket: "",
  messagingSenderId: "761394057594",
  appId: "1:761394057594:web:7f06d357a07be0acef86c3",
  measurementId: "G-BTN0L89BJS"
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
