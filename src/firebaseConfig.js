// 1. Import initializeApp
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// 2. Add this line to import getFirestore
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBF_QQqORoGRIn6Xp6C6g4NaaiYOKU8LDA",
  authDomain: "iyouwork-test.firebaseapp.com",
  projectId: "iyouwork-test",
  storageBucket: "iyouwork-test.firebasestorage.app",
  messagingSenderId: "96010877831",
  appId: "1:96010877831:web:83d7b5dd540f1b61bb3122",
  measurementId: "G-6LBKP1PFBB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// 3. This will now work because getFirestore is defined
export const db = getFirestore(app);