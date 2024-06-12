import React, { useState, useEffect, useRef } from "react";
import "./BeboClicker.css";
import clickerImage from "./clicker-image.png";
import boostImage from "./boost-image.png";
import missionsImage from "./missions-image.png";
import upgradeImage from "./upgrade-image.png";
import referralImage from "./referral-image.png"; // Импортируйте свои изображения

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

  const [maxEnergy, setMaxEnergy] = useState(() => {
    const savedMaxEnergy = JSON.parse(localStorage.getItem("maxEnergy"));
    return savedMaxEnergy !== null ? savedMaxEnergy : initialEnergy;
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

  const [energyUpgradeLevel, setEnergyUpgradeLevel] = useState(() => {
    const savedEnergyUpgradeLevel = JSON.parse(
      localStorage.getItem("energyUpgradeLevel")
    );
    return savedEnergyUpgradeLevel !== null ? savedEnergyUpgradeLevel : 1;
  });
  const [energyUpgradeCost, setEnergyUpgradeCost] = useState(() => {
    const savedEnergyUpgradeCost = JSON.parse(
      localStorage.getItem("energyUpgradeCost")
    );
    return savedEnergyUpgradeCost !== null ? savedEnergyUpgradeCost : 500;
  });

  const clickPositionRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const saveData = () => {
      localStorage.setItem("coins", JSON.stringify(coins));
      localStorage.setItem("energy", JSON.stringify(energy));
      localStorage.setItem("maxEnergy", JSON.stringify(maxEnergy));
      localStorage.setItem("lastActive", Date.now());
      localStorage.setItem("upgradeLevel", JSON.stringify(upgradeLevel));
      localStorage.setItem("upgradeCost", JSON.stringify(upgradeCost));
      localStorage.setItem(
        "energyUpgradeLevel",
        JSON.stringify(energyUpgradeLevel)
      );
      localStorage.setItem(
        "energyUpgradeCost",
        JSON.stringify(energyUpgradeCost)
      );
    };

    saveData();

    const interval = setInterval(saveData, 5000); // Save data every 5 seconds
    return () => clearInterval(interval);
  }, [
    coins,
    energy,
    maxEnergy,
    upgradeLevel,
    upgradeCost,
    energyUpgradeLevel,
    energyUpgradeCost,
  ]);

  useEffect(() => {
    const energyInterval = setInterval(() => {
      if (energy < maxEnergy) {
        setEnergy((prevEnergy) => Math.min(prevEnergy + 100, maxEnergy));
      }
    }, 1000);

    return () => clearInterval(energyInterval);
  }, [energy, maxEnergy]);

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

  const handleEnergyUpgradeClick = () => {
    if (coins >= energyUpgradeCost && energyUpgradeLevel < 20) {
      setCoins((prevCoins) => prevCoins - energyUpgradeCost);
      setEnergyUpgradeLevel((prevLevel) => prevLevel + 1);
      setEnergyUpgradeCost((prevCost) => prevCost + 500);
      setMaxEnergy((prevMaxEnergy) => prevMaxEnergy + 500);
    }
  };

  return (
    <div className={`bebo-clicker ${isUpgrading ? "upgrading" : ""}`}>
      <p>{coins.toLocaleString()}</p>
      {!isUpgrading && (
        <>
          <div className="coins-container">
            <div
              className="clicker-container"
              onPointerDown={handlePointerDown}
            >
              <img src={clickerImage} alt="Clicker" className="clicker-image" />
            </div>
            <p className="energyp">
              {energy}/{maxEnergy}
            </p>
          </div>
        </>
      )}
      {isUpgrading && (
        <div className="upgrade-info">
          <div className="click-upgrade-section">
            <p className="Clickupgrlevel"></p>
            <div className="Clickupgradecost">
              <p></p>
            </div>
            <button
              className="Clickupgradeclickbutton"
              onClick={handleClickUpgrade}
            >
              Upgrade Clicks
            </button>
          </div>
          <div className="energy-upgrade-section">
            <p className="Energyupgrlevel"></p>
            <div className="Energyupgradecost">
              <p></p>
            </div>
            <button
              className="Energyupgradeclickbutton"
              onClick={handleEnergyUpgradeClick}
            >
              Upgrade Energy
            </button>
          </div>
        </div>
      )}
      <hr className="linianavbara"></hr>
      <div className="buttons-container">
        <img
          src={boostImage}
          alt="Boost"
          className="boost-button"
          onClick={handleBoostClick}
        />
        <img
          src={missionsImage}
          alt="Missions"
          className="missions-button"
          onClick={handleMissionsClick}
        />
        <img
          src={upgradeImage}
          alt="Upgrade"
          className="upgrade-button"
          onClick={handleUpgradeClick}
        />
        <img
          src={referralImage}
          alt="Referral"
          className="referral-button"
          onClick={handleReferralClick}
        />
      </div>
    </div>
  );
}

export default BeboClicker;
