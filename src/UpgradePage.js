// UpgradePage.js
import React from "react";
import Navigation from "./Navigation";

function UpgradePage({ onBackClick }) {
  return (
    <div className="upgrade-page">
      <h1>Upgrade Page</h1>
      <Navigation onBackClick={onBackClick} />
    </div>
  );
}

export default UpgradePage;
