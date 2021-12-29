// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import{getAuth, GoogleAuthProvider} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBqSdWmM1LK5j4MM-NKFoChyI9L8Csu1dw",
  authDomain: "blog-4c0f1.firebaseapp.com",
  projectId: "blog-4c0f1",
  storageBucket: "blog-4c0f1.appspot.com",
  messagingSenderId: "920684333612",
  appId: "1:920684333612:web:6b93513ab9066451c71f89"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app)
export const auth = getAuth(app) //after authentication this auth variable will be filled with unique information like user name and id. it can be used later on to identify which author we wanna log out and stuffs
export const provider = new GoogleAuthProvider()