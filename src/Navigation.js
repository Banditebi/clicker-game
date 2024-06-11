import React from "react";
import "./Navigation.css";

function Navigation({ onUpgradeClick, onBackClick }) {
  const handleUpgradeClick = (e) => {
    e.preventDefault();
    onUpgradeClick();
  };

  const handleBackClick = (e) => {
    e.preventDefault();
    onBackClick();
  };

  return (
    <div className="navigation">
      <a href="#home" onClick={handleBackClick}>
        BOOST
      </a>
      <a href="#about" onClick={handleBackClick}>
        MISSIONS
      </a>
      <a href="#contact" onClick={handleUpgradeClick}>
        UPGRADE
      </a>
    </div>
  );
}

export default Navigation;
