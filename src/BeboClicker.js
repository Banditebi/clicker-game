import React, { useState, useEffect, useRef } from "react";
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

  const [isUpgrading, setIsUpgrading] = useState(false);
  const [upgradeLevel, setUpgradeLevel] = useState(() => {
    const savedLevel = JSON.parse(localStorage.getItem("upgradeLevel"));
    return savedLevel !== null ? savedLevel : 1;
  });
  const [upgradeCost, setUpgradeCost] = useState(() => {
    const savedCost = JSON.parse(localStorage.getItem("upgradeCost"));
    return savedCost !== null ? savedCost : 500;
  });

  const clickPositionRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const saveData = () => {
      localStorage.setItem("coins", JSON.stringify(coins));
      localStorage.setItem("energy", JSON.stringify(energy));
      localStorage.setItem("lastActive", Date.now());
      localStorage.setItem("upgradeLevel", JSON.stringify(upgradeLevel));
      localStorage.setItem("upgradeCost", JSON.stringify(upgradeCost));
    };

    saveData();

    const interval = setInterval(saveData, 5000); // Save data every 5 seconds
    return () => clearInterval(interval);
  }, [coins, energy, upgradeLevel, upgradeCost]);

  useEffect(() => {
    const energyInterval = setInterval(() => {
      if (energy < initialEnergy) {
        setEnergy((prevEnergy) => Math.min(prevEnergy + 100, initialEnergy));
      }
    }, 1000);

    return () => clearInterval(energyInterval);
  }, [energy, initialEnergy]);

  const handlePointerDown = (e) => {
    const coinsPerClick = 5 * upgradeLevel;
    if (energy >= coinsPerClick) {
      setCoins((prevCoins) => prevCoins + coinsPerClick);
      setEnergy((prevEnergy) => prevEnergy - coinsPerClick);
      clickPositionRef.current.x = e.clientX;
      clickPositionRef.current.y = e.clientY;
      const x = clickPositionRef.current.x;
      const y = clickPositionRef.current.y;
      const clickText = document.createElement("span");
      clickText.className = "click-text";
      clickText.innerText = `+${coinsPerClick}`;
      clickText.style.top = `${y}px`;
      clickText.style.left = `${x}px`;
      document.body.appendChild(clickText);
      setTimeout(() => {
        document.body.removeChild(clickText);
      }, 1000); // Remove click text after 1 second
    }
  };

  const handleBoostClick = () => {
    // Implement boost functionality
  };

  const handleMissionsClick = () => {
    // Implement missions functionality
  };

  const handleUpgradeClick = () => {
    setIsUpgrading((prevState) => !prevState); // Toggle isUpgrading state
    onUpgradeClick();
  };

  const handleReferralClick = () => {
    // Implement referral functionality
  };

  const handleClickUpgrade = () => {
    if (coins >= upgradeCost) {
      setCoins((prevCoins) => prevCoins - upgradeCost);
      setUpgradeLevel((prevLevel) => prevLevel + 1);
      setUpgradeCost((prevCost) => prevCost + 500);
    }
  };

  return (
    <div className={`bebo-clicker ${isUpgrading ? "upgrading" : ""}`}>
      <h1>$BEBO</h1>
      <p>{coins.toLocaleString()}</p>
      {!isUpgrading && (
        <>
          <div className="clicker-container" onPointerDown={handlePointerDown}>
            <img src={clickerImage} alt="Clicker" className="clicker-image" />
          </div>
          <p className="energy">
            {energy}/{initialEnergy}
          </p>
        </>
      )}
      {isUpgrading && (
        <div className="upgrade-info">
          <p className="upgrlevel">LVL:{upgradeLevel}</p>

          <div className="upgradecost">
            <p>PRICE:{upgradeCost}</p>
          </div>

          <button className="upgradeclickbutton" onClick={handleClickUpgrade}>
            Upgrade
          </button>
        </div>
      )}
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
