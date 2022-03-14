import firebase from "firebase/app";
import "firebase/auth";

const app = firebase.initializeApp({
  apiKey: "AIzaSyAk_okq8ZD5BZXQrBbTYxYOL49mUdKY9i8",
  authDomain: "mulesofttshirtdemo.firebaseapp.com",
  projectId: "mulesofttshirtdemo",
  storageBucket: "mulesofttshirtdemo.appspot.com",
  messagingSenderId: "344356210025",
  appId: "1:344356210025:web:838c4dbb39e335d959a9f8",
  measurementId: "G-KW5K1QC5TW",
});

export const auth = app.auth();
export default app;
