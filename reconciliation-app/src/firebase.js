// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Replace with your real Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyDAmC6kCbFbgkMlF4hmEEXgRzl-w_PaOd0",
  authDomain: "terassen-14625.firebaseapp.com",
  projectId: "terassen-14625",
  storageBucket: "terassen-14625.firebasestorage.app",
  messagingSenderId: "779498131608",
  appId: "1:779498131608:web:0822bf270b912a243cc0ed",
  measurementId: "G-PQ1SC651L9"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
