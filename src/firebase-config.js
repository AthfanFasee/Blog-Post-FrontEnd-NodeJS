// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import{getAuth, GoogleAuthProvider} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB7as5-1dRSAuQbHci3TDiaIWB3tdsS4KU",
  authDomain: "time-test-bloggg.firebaseapp.com",
  projectId: "time-test-bloggg",
  storageBucket: "time-test-bloggg.appspot.com",
  messagingSenderId: "783448403357",
  appId: "1:783448403357:web:ba3b1189267ba50c7cd374"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app)
export const auth = getAuth(app) //after authentication this auth variable will be filled with unique information like user name and id. it can be used later on to identify which author we wanna log out and stuffs
export const provider = new GoogleAuthProvider()