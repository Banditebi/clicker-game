import React from "react";
import Navigation from "./Navigation";
import "./UpgradePage.css";

function UpgradePage({ onBackClick, onUpgradeClick }) {
  return (
    <div className="upgrade-page">
      <h1>Upgrade Page</h1>
      <div className="coins">Coins: 1000</div>
      <Navigation onUpgradeClick={onUpgradeClick} />
      <button className="back-button" onClick={onBackClick}>
        Back
      </button>
    </div>
  );
}

export default UpgradePage;
