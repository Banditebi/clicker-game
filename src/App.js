import React, { useState } from "react";
import BeboClicker from "./BeboClicker";
import UpgradePage from "./UpgradePage";
import "./App.css";

function App() {
  const [currentPage, setCurrentPage] = useState("BeboClicker");

  const handleUpgradeClick = () => {
    setCurrentPage("UpgradePage");
  };

  const handleBackClick = () => {
    setCurrentPage("BeboClicker");
  };

  return (
    <div className="App">
      {currentPage === "BeboClicker" && (
        <BeboClicker onUpgradeClick={handleUpgradeClick} />
      )}
      {currentPage === "UpgradePage" && (
        <UpgradePage
          onBackClick={handleBackClick}
          onUpgradeClick={handleUpgradeClick}
        />
      )}
    </div>
  );
}

export default App;
