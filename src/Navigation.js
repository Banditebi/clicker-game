// Navigation.js
import React from "react";
import "./Navigation.css";

function Navigation({ onUpgradeClick }) {
  const handleClick = (e) => {
    e.preventDefault(); // Предотвращаем стандартное поведение перехода по ссылке
    onUpgradeClick(); // Вызываем обработчик события onUpgradeClick
  };

  return (
    <div className="navigation">
      <a href="#home">BOOST</a>
      <a href="#about">MISSIONS</a>
      <a href="#contact" onClick={handleClick}>
        UPGRADE
      </a>
    </div>
  );
}

export default Navigation;
