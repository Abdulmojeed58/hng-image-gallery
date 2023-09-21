// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: import.meta.env.VITE_REACT_PUBLIC_FIREBASE_API_KEY,
//   authDomain: import.meta.env.VITE_REACT_PUBLIC_FIREBASE_AUTH_DOMAIN,
//   projectId: import.meta.env.VITE_REACT_PUBLIC_FIREBASE_PROJECT_ID,
//   storageBucket: import.meta.env.VITE_REACT_PUBLIC_FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: import.meta.env.VITE_REACT_PUBLIC_FIREBASE_MESSAGE_SENDER_ID,
//   appId: import.meta.env.VITE_REACT_PUBLIC_FIREBASE_API_ID
// };
// const firebaseConfig = {
//   apiKey: import.meta.env.VITE_REACT_PUBLIC_FIREBASE_API_KEY,
//   authDomain: import.meta.env.VITE_REACT_PUBLIC_FIREBASE_AUTH_DOMAIN,
//   projectId: import.meta.env.VITE_REACT_PUBLIC_FIREBASE_PROJECT_ID,
//   storageBucket: import.meta.env.VITE_REACT_PUBLIC_FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: import.meta.env.VITE_REACT_PUBLIC_FIREBASE_MESSAGE_SENDER_ID,
//   appId: import.meta.env.VITE_REACT_PUBLIC_FIREBASE_API_ID
// };

const firebaseConfig = {
    apiKey: "AIzaSyCZbSG8vwcyOvEbkID1u-XMAz5j99H7imQ",
    authDomain: "hng-image-gallery-7ac73.firebaseapp.com",
    projectId: "hng-image-gallery-7ac73",
    storageBucket: "hng-image-gallery-7ac73.appspot.com",
    messagingSenderId: "346155497355",
    appId: "1:346155497355:web:0a323ee3303bd6c829618e"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

