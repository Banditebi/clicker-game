// BeboClicker.js
import React, { useState, useEffect } from "react";
import "./BeboClicker.css";
import clickerImage from "./clicker-image.png";
import Navigation from "./Navigation";
import UpgradePage from "./UpgradePage";

function BeboClicker() {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [coins, setCoins] = useState(() => {
    const savedCoins = JSON.parse(localStorage.getItem("coins"));
    return savedCoins !== null ? savedCoins : 0;
  });
  const initialEnergy = 500;
  const [energy, setEnergy] = useState(() => {
    const savedEnergy = JSON.parse(localStorage.getItem("energy"));
    const lastActive = JSON.parse(localStorage.getItem("lastActive"));
    if (savedEnergy !== null && lastActive !== null) {
      const now = Date.now();
      const timeElapsed = Math.floor((now - lastActive) / 1000);
      const energyToAdd = Math.min(initialEnergy, timeElapsed);
      return Math.min(initialEnergy, savedEnergy + energyToAdd);
    }
    return savedEnergy !== null ? savedEnergy : initialEnergy;
  });
  const [clickCount, setClickCount] = useState(0);
  const [showUpgradePage, setShowUpgradePage] = useState(false);
  const [clickText, setClickText] = useState(null);

  useEffect(() => {
    localStorage.setItem("coins", JSON.stringify(coins));
  }, [coins]);

  useEffect(() => {
    localStorage.setItem("energy", JSON.stringify(energy));
    localStorage.setItem("lastActive", Date.now());
  }, [energy]);

  useEffect(() => {
    const energyInterval = setInterval(() => {
      if (energy < initialEnergy) {
        setEnergy((prevEnergy) => Math.min(prevEnergy + 1, initialEnergy));
      }
    }, 1000);

    return () => clearInterval(energyInterval);
  }, [energy, initialEnergy]);

  const handleClick = (e) => {
    const coinsPerClick = 5;
    if (clickCount < 5 && energy >= 5) {
      setCoins((prevCoins) => prevCoins + coinsPerClick);
      setEnergy((prevEnergy) => prevEnergy - 5);
      setClickCount((prevClickCount) => prevClickCount + 1);
      const rect = e.target.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      setClickText({ x, y, text: `+${coinsPerClick}` });
      setTimeout(() => setClickText(null), 500);
    }
  };

  useEffect(() => {
    const resetClickCount = setTimeout(() => {
      setClickCount(0);
    }, 200);

    return () => clearTimeout(resetClickCount);
  }, [clickCount]);

  const handleUpgradeClick = () => {
    setShowUpgradePage(true);
  };

  const handleBackClick = () => {
    setShowUpgradePage(false);
  };

  return (
    <div className="bebo-clicker">
      {!showUpgradePage ? (
        <>
          <h1>$BEBO</h1>
          <p>{coins.toLocaleString()}</p>
          <div className="clicker-container" onClick={handleClick}>
            <img src={clickerImage} alt="Clicker" className="clicker-image" />
            {clickText && (
              <span
                className="click-text"
                style={{ top: clickText.y, left: clickText.x }}
              >
                {clickText.text}
              </span>
            )}
          </div>
          <p className="energy">
            {energy}/{initialEnergy}
          </p>
          <Navigation
            isOpen={isNavOpen}
            toggleNav={() => setIsNavOpen(!isNavOpen)}
            onUpgradeClick={handleUpgradeClick}
          />
        </>
      ) : (
        <UpgradePage coins={coins} onBackClick={handleBackClick} />
      )}
    </div>
  );
}

export default BeboClicker;
