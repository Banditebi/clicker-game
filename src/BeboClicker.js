import React, { useState, useEffect, useRef } from "react";
import "./BeboClicker.css";
import clickerImage from "./clicker-image.png";
import boostImage from "./boost-image.png";
import missionsImage from "./missions-image.png";
import referralImage from "./referral-image.png";

function formatNumberWithCommas(number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

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
  const [isBoostActive, setIsBoostActive] = useState(false);
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

    const interval = setInterval(saveData, 5000); // Сохраняем данные каждые 5 секунд
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

  const handleButtonClick = () => {
    setCoins((prevCoins) => prevCoins + upgradeLevel);
  };

  const handleBoostClick = () => {
    setIsBoostActive(true);
    setTimeout(() => {
      setIsBoostActive(false);
    }, 30000);
  };

  const handleMissionsClick = () => {
    // Действие при нажатии на кнопку "Миссии"
  };

  const handleReferralClick = () => {
    // Действие при нажатии на кнопку "Рефералы"
  };

  return (
    <div className={`app-container ${isBoostActive ? "boost-active" : ""}`}>
      <div className="black-background"></div>
      <div className="coins-display">{formatNumberWithCommas(coins)} coins</div>
      <div className="energy-display">Energy: {energy}</div>
      <hr className="divider" />
      <img
        src={clickerImage}
        className="clicker-image"
        onClick={handleButtonClick}
        alt="Clicker"
        draggable="false"
      />
      <div className="bottom-buttons">
        <button
          className="button boost-button"
          onClick={handleBoostClick}
          disabled={isBoostActive}
        >
          <span className="boosttextbtn">Boost</span>
        </button>
        <button
          className="button missions-button"
          onClick={handleMissionsClick}
        >
          <span className="missiontextbtn">Missions</span>
        </button>
        <button
          className="button referral-button"
          onClick={handleReferralClick}
        >
          <span className="referaltextbtn">Referral</span>
        </button>
      </div>
    </div>
  );
}

export default BeboClicker;
