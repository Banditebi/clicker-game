import React, { useState } from "react";
import BeboClicker from "./BeboClicker";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import "./App.css";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

function App() {
  const [currentPage, setCurrentPage] = useState("BeboClicker");

  const handleUpgradeClick = () => {
    // Можно добавить логику для обработки клика на странице BeboClicker
  };

  const handleBackClick = () => {
    setCurrentPage("BeboClicker");
  };

  return (
    <div className="App">
      {currentPage === "BeboClicker" && (
        <>
          <div className="black-background"></div>
          <BeboClicker onUpgradeClick={handleUpgradeClick} />
        </>
      )}
    </div>
  );
}

export default App;
