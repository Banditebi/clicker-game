// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyBb_s9zPIXucbcJG7u8LjJereu0gbfCBF0",
  authDomain: "beboclicker.firebaseapp.com",
  databaseURL: "https://beboclicker-default-rtdb.firebaseio.com",
  projectId: "beboclicker",
  storageBucket: "beboclicker.appspot.com",
  messagingSenderId: "486612910459",
  appId: "1:486612910459:web:65594978cdafe4d893fdde",
  measurementId: "G-YJ51EQ57DW",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

export { db };
