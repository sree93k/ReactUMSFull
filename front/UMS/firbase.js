

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASEP_API_KEY,
  authDomain: "reactfullums.firebaseapp.com",
  projectId: "reactfullums",
  storageBucket: "reactfullums.appspot.com",
  messagingSenderId: "841981486997",
  appId: "1:841981486997:web:758cf0371b03d1a174f89c"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);