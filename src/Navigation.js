// Navigation.js
import React from "react";
import "./Navigation.css";

function Navigation({ onUpgradeClick }) {
  return (
    <div className="navigation">
      <a href="#home">BOOST</a>
      <a href="#about">MISSIONS</a>
      <a href="#contact" onClick={onUpgradeClick}>
        UPGRADE
      </a>
    </div>
  );
}

export default Navigation;
