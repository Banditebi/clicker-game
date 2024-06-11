import React, { useState, useEffect } from "react";
import "./BeboClicker.css";
import clickerImage from "./clicker-image.png";

function BeboClicker({ onUpgradeClick }) {
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

  useEffect(() => {
    const saveData = () => {
      localStorage.setItem("coins", JSON.stringify(coins));
      localStorage.setItem("energy", JSON.stringify(energy));
      localStorage.setItem("lastActive", Date.now());
    };

    saveData();

    const interval = setInterval(saveData, 5000); // Save data every 5 seconds
    return () => clearInterval(interval);
  }, [coins, energy]);

  useEffect(() => {
    const energyInterval = setInterval(() => {
      if (energy < initialEnergy) {
        setEnergy((prevEnergy) => Math.min(prevEnergy + 1, initialEnergy));
      }
    }, 1000);

    return () => clearInterval(energyInterval);
  }, [energy, initialEnergy]);

  const handlePointerDown = (e) => {
    const coinsPerClick = 5;
    if (energy >= 5) {
      setCoins((prevCoins) => prevCoins + coinsPerClick);
      setEnergy((prevEnergy) => prevEnergy - 5);
      const x = e.clientX;
      const y = e.clientY;
      const clickText = document.createElement("span");
      clickText.className = "click-text";
      clickText.innerText = `+${coinsPerClick}`;
      clickText.style.top = `${y}px`;
      clickText.style.left = `${x}px`;
      document.body.appendChild(clickText);
      setTimeout(() => {
        document.body.removeChild(clickText);
      }, 1000); // Set a timer to remove the click text after 1 second
    }
  };

  const handleBoostClick = () => {
    // Implement boost functionality
  };

  const handleMissionsClick = () => {
    // Implement missions functionality
  };

  const handleUpgradeClick = () => {
    onUpgradeClick();
  };

  const handleReferralClick = () => {
    // Implement referral functionality
  };

  return (
    <div className="bebo-clicker">
      <h1>$BEBO</h1>
      <p>{coins.toLocaleString()}</p>
      <div className="clicker-container" onPointerDown={handlePointerDown}>
        <img src={clickerImage} alt="Clicker" className="clicker-image" />
      </div>
      <p className="energy">
        {energy}/{initialEnergy}
      </p>
      <div className="buttons-container">
        <button className="boost-button" onClick={handleBoostClick}>
          Boost
        </button>
        <button className="missions-button" onClick={handleMissionsClick}>
          Missions
        </button>
        <button className="upgrade-button" onClick={handleUpgradeClick}>
          Upgrade
        </button>
        <button className="referral-button" onClick={handleReferralClick}>
          Referral
        </button>
      </div>
    </div>
  );
}

export default BeboClicker;
