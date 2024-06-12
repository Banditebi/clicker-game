import React, { useState } from "react";
import BeboClicker from "./BeboClicker";
import "./App.css";

function App() {
  const [currentPage, setCurrentPage] = useState("BeboClicker");

  const handleUpgradeClick = () => {};

  const handleBackClick = () => {
    setCurrentPage("BeboClicker");
  };

  return (
    <div className="App">
      {currentPage === "BeboClicker" && (
        <>
          <div className="black-background"></div> {/* Добавляем черный фон */}
          <BeboClicker onUpgradeClick={handleUpgradeClick} />
        </>
      )}
    </div>
  );
}

export default App;
