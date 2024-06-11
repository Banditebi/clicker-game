import React from "react";
import "./Navigation.css";

function Navigation({ className, onUpgradeClick }) {
  const handleUpgradeClick = (e) => {
    e.preventDefault();
    onUpgradeClick();
  };

  return (
    <div className={`navigation ${className}`}>
      <a href="#home">BOOST</a>
      <a href="#about">MISSIONS</a>
      <a href="#contact" onClick={handleUpgradeClick}>
        UPGRADE
      </a>
    </div>
  );
}

export default Navigation;
