// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from "firebase/firestore";
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBGqi4S0mdX_K6CqtqHQprslvZyR8esHBY",
  authDomain: "iyouwork-bb3f4.firebaseapp.com",
  databaseURL: "https://iyouwork-bb3f4-default-rtdb.firebaseio.com",
  projectId: "iyouwork-bb3f4",
  storageBucket: "iyouwork-bb3f4.appspot.com", // FIXED
  messagingSenderId: "272027709842",
  appId: "1:272027709842:web:760dc7117aa3d4264c914b",
  measurementId: "G-1ZGNQGH6Z9"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app); // Disabled due to 403 Forbidden error

// 3. This will now work because getFirestore is defined
export const db = getFirestore(app);