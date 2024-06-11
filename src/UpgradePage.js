import React from "react";
import "./UpgradePage.css";

function UpgradePage({ coins, onBackClick }) {
  return (
    <div className="upgrade-page">
      <p className="coins">{coins.toLocaleString()}</p>
      <button onClick={onBackClick} className="back-button">
        Назад
      </button>
    </div>
  );
}

export default UpgradePage;
