// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import{getAuth, GoogleAuthProvider} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBAyp1h9gVCSqpFlk3lliaoVQW0JsvnNes",
  authDomain: "blog3-bd55c.firebaseapp.com",
  projectId: "blog3-bd55c",
  storageBucket: "blog3-bd55c.appspot.com",
  messagingSenderId: "423930861235",
  appId: "1:423930861235:web:f4eeb24acf40c0b6fb02c6"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app)
export const auth = getAuth(app) //after authentication this auth variable will be filled with unique information like user name and id. it can be used later on to identify which author we wanna log out and stuffs
export const provider = new GoogleAuthProvider()