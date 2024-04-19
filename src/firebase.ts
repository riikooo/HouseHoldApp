// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAaETUjU2WNQRo_15LCTklweL4XWLpBgD0",
  authDomain: "householdtypescript-114f8.firebaseapp.com",
  projectId: "householdtypescript-114f8",
  storageBucket: "householdtypescript-114f8.appspot.com",
  messagingSenderId: "738354065409",
  appId: "1:738354065409:web:052481ecd4a47744855000"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };