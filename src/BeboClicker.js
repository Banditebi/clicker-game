import React, { useState, useEffect, useRef } from "react";
import "./BeboClicker.css";
import clickerImage from "./clicker-image.png";
import boostImage from "./boost-image.png";
import missionsImage from "./missions-image.png";
import referralImage from "./referral-image.png";
import upgradeImage from "./upgrade-image.png";

// Функция для форматирования числа с разделителями тысяч
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
      }, 1000); // Удалить текст клика через 1 секунду
    }
  };

  const handleBoostClick = () => {
    // Реализовать функциональность усиления
  };

  const handleMissionsClick = () => {
    // Реализовать функциональность миссий
  };

  const handleUpgradeClick = () => {
    setIsUpgrading((prevState) => !prevState); // Переключаем состояние isUpgrading
    onUpgradeClick();
  };

  const handleReferralClick = () => {
    // Реализовать функциональность рефералов
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
      {/* Отображаем количество монет с разделителями тысяч */}
      <div className="coins-display">{formatNumberWithCommas(coins)}</div>

      {/* Отображаем текущую энергию */}
      <div className="energy-display">
        {energy} / {maxEnergy}
      </div>

      {/* Отображаем изображение для клика и размещаем его посередине */}
      <img
        src={clickerImage}
        alt="Clicker"
        className="clicker-image"
        style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
        onPointerDown={handlePointerDown}
      />
      <hr className="divider" />

      <div className="bottom-buttons">
        <div className="button boost-button" onClick={handleBoostClick}>
          <img src={boostImage} alt="Boost" />
          <p className="boosttextbtn">Boost</p>
        </div>
        <div className="button missions-button" onClick={handleMissionsClick}>
          <img src={missionsImage} alt="Missions" />
          <p className="missiontextbtn">Tasks</p>
        </div>
        <div className="button referral-button" onClick={handleReferralClick}>
          <img src={referralImage} alt="Referral" />
          <p className="referaltextbtn">Mates</p>
        </div>
      </div>
    </div>
  );
}

export default BeboClicker;
