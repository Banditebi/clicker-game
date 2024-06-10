import React from "react";
import "./Navigation.css";

function Navigation({ isOpen, toggleNav }) {
  return (
    <div className="navigation">
      <a href="#home">BOOST</a>
      <a href="#about">MISSIONS</a>
      <a href="#contact">UPGRADE</a>
    </div>
  );
}

export default Navigation;
