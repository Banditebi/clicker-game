import React, { useState, useEffect } from "react";
import "./BeboClicker.css";
import clickerImage from "./clicker-image.png";
import Navigation from "./Navigation";

const tg = window.Telegram.WebApp;

function BeboClicker() {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const getSavedValue = (key, initialValue) => {
    const savedValue = JSON.parse(localStorage.getItem(key));
    if (savedValue !== null) return savedValue;
    if (initialValue instanceof Function) return initialValue();
    return initialValue;
  };

  const [coins, setCoins] = useState(() => getSavedValue("coins", 0));

  useEffect(() => {
    localStorage.setItem("coins", JSON.stringify(coins));
  }, [coins]);

  const handleClick = () => {
    setCoins((prevCoins) => prevCoins + 5);
  };

  return (
    <div className="bebo-clicker">
      <h1>$BEBO</h1>
      <p>{coins.toLocaleString()}</p>
      <img
        src={clickerImage}
        alt="Clicker"
        className="clicker-image"
        onClick={handleClick}
      />
      <Navigation
        isOpen={isNavOpen}
        toggleNav={() => setIsNavOpen(!isNavOpen)}
      />
    </div>
  );
}

export default BeboClicker;
