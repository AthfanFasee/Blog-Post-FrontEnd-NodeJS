// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import{getAuth, GoogleAuthProvider} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyALg53SPbiFrb3Zr7GwYVvHU5dDP7vJhXg",
  authDomain: "blog-personal-testing.firebaseapp.com",
  projectId: "blog-personal-testing",
  storageBucket: "blog-personal-testing.appspot.com",
  messagingSenderId: "803536847344",
  appId: "1:803536847344:web:d1d9e65f95f48584aadd35"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app)
export const auth = getAuth(app) //after authentication this auth variable will be filled with unique information like user name and id. it can be used later on to identify which author we wanna log out and stuffs
export const provider = new GoogleAuthProvider()