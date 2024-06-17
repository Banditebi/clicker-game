import React, { useState } from "react";
import BeboClicker from "./BeboClicker";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth"; // Импортируем модуль аутентификации
import { getDatabase } from "firebase/database"; // Импортируем модуль базы данных Firebase
import "./App.css";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app); // Получаем объект аутентификации
const realtimeDb = getDatabase(app); // Получаем объект базы данных в реальном времени

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

export { app, analytics, auth, realtimeDb }; // Экспортируем app, analytics, auth и realtimeDb для использования в других частях приложения
export default App;
