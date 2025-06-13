// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDAmC6kCbFbgkMlF4hmEEXgRzl-w_PaOd0",
  authDomain: "terassen-14625.firebaseapp.com",
  projectId: "terassen-14625",
  storageBucket: "terassen-14625.firebasestorage.app",
  messagingSenderId: "779498131608",
  appId: "1:779498131608:web:0822bf270b912a243cc0ed",
  measurementId: "G-PQ1SC651L9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);