// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCa4frlrMht8pBohvYGJVDUP-nFCbzA9lI",
  authDomain: "akshay-tracker.firebaseapp.com",
  projectId: "akshay-tracker",
  storageBucket: "akshay-tracker.firebasestorage.app",
  messagingSenderId: "594199433598",
  appId: "1:594199433598:web:187c546aa72cc505d3a32f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);