// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "niimatullahrealestate-f6e0f.firebaseapp.com",
  projectId: "niimatullahrealestate-f6e0f",
  storageBucket: "niimatullahrealestate-f6e0f.appspot.com",
  messagingSenderId: "885087669123",
  appId: "1:885087669123:web:6bea5ffb0d9e7c3d4d04b6"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
