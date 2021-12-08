// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDM2OxmaoKzSghKXwntJuHIQ7rBT-Revyw",
  authDomain: "moviesapp-8363c.firebaseapp.com",
  projectId: "moviesapp-8363c",
  storageBucket: "moviesapp-8363c.appspot.com",
  messagingSenderId: "117142473127",
  appId: "1:117142473127:web:85ed2b5d7edc0c7f0f0e82",
  // measurementId: "${config.measurementId}"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)