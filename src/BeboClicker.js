import React, { useState, useEffect, useRef } from "react";
import "./BeboClicker.css";
import clickerImage from "./clicker-image.png";

function formatNumberWithCommas(number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function BeboClicker() {
  const [coins, setCoins] = useState(250000);
  const [isBoostActive, setIsBoostActive] = useState(false);
  const [energy, setEnergy] = useState(500);
  const [maxEnergy, setMaxEnergy] = useState(500);
  const [coinsPerClick, setCoinsPerClick] = useState(15);
  const [clickBoost, setClickBoost] = useState(3);
  const [maxClickBoost, setMaxClickBoost] = useState(3);
  const [isClickBoostActive, setIsClickBoostActive] = useState(false);
  const [boostDuration, setBoostDuration] = useState(20);
  const [restoreEnergy, setRestoreEnergy] = useState(3);
  const [coinsPerClickUpgradeLevel, setCoinsPerClickUpgradeLevel] = useState(1);
  const [coinsPerClickUpgradeCost, setCoinsPerClickUpgradeCost] = useState(500);
  const [maxEnergyUpgradeLevel, setMaxEnergyUpgradeLevel] = useState(1);
  const [maxEnergyUpgradeCost, setMaxEnergyUpgradeCost] = useState(2500);
  const [isBotPurchased, setIsBotPurchased] = useState(false);
  const [botCost, setBotCost] = useState(200000);

  const initialCoinsPerClickRef = useRef(1); // Use ref to store the initial coins per click

  // Function to restore energy per second
  const restoreEnergyPerSecond = () => {
    if (energy < maxEnergy) {
      setEnergy((prevEnergy) => Math.min(prevEnergy + 1, maxEnergy));
    }
  };

  // Set interval to restore energy every second
  useEffect(() => {
    const interval = setInterval(() => {
      restoreEnergyPerSecond();
    }, 1000);

    return () => clearInterval(interval);
  }, [energy, maxEnergy]);

  const activateClickBoost = () => {
    if (!isClickBoostActive && clickBoost > 0) {
      initialCoinsPerClickRef.current = coinsPerClick; // Store initial coins per click
      const boostedCoinsPerClick = coinsPerClick * 5;

      setClickBoost((prevClickBoost) => prevClickBoost - 1);
      setMaxClickBoost((prevMaxClickBoost) => prevMaxClickBoost - 1);
      setIsClickBoostActive(true);
      setIsBoostActive(false);

      setTimeout(() => {
        setCoinsPerClick(initialCoinsPerClickRef.current); // Restore initial coins per click
        setIsClickBoostActive(false);
      }, boostDuration * 1000);

      setCoinsPerClick(boostedCoinsPerClick);
    }
  };

  const handleButtonClick = () => {
    if (energy >= coinsPerClick || isClickBoostActive) {
      const currentCoinsPerClick = isClickBoostActive
        ? coinsPerClick * 5
        : coinsPerClick;
      setCoins((prevCoins) => prevCoins + currentCoinsPerClick);
      if (!isClickBoostActive) {
        setEnergy((prevEnergy) => prevEnergy - coinsPerClick);
      }
    }
  };

  const handleBoostClick = () => {
    setIsBoostActive(true);
  };

  const handleBackClick = () => {
    setIsBoostActive(false);
  };

  const handleMissionsClick = () => {
    // Handle missions button click
  };

  const handleReferralClick = () => {
    // Handle referral button click
  };

  const handleRestoreEnergy = () => {
    if (restoreEnergy > 0) {
      setEnergy(maxEnergy);
      setRestoreEnergy((prevRestoreEnergy) => prevRestoreEnergy - 1);
      setIsBoostActive(false);
    }
  };

  const handleUpgradeCoinsPerClick = () => {
    if (coins >= coinsPerClickUpgradeCost) {
      setCoins((prevCoins) => prevCoins - coinsPerClickUpgradeCost);
      setCoinsPerClick((prevCoinsPerClick) => prevCoinsPerClick + 1);
      setCoinsPerClickUpgradeLevel((prevLevel) => prevLevel + 1);
      setCoinsPerClickUpgradeCost((prevCost) => prevCost * 2);
    }
  };

  const handleUpgradeMaxEnergy = () => {
    if (coins >= maxEnergyUpgradeCost) {
      setCoins((prevCoins) => prevCoins - maxEnergyUpgradeCost);
      setMaxEnergy((prevMaxEnergy) => prevMaxEnergy + 500); // Increase max energy by 500
      setMaxEnergyUpgradeLevel((prevLevel) => prevLevel + 1);
      setMaxEnergyUpgradeCost((prevCost) => prevCost * 2);
    }
  };

  const handleBuyBot = () => {
    if (!isBotPurchased && coins >= botCost) {
      setCoins((prevCoins) => prevCoins - botCost);
      setIsBotPurchased(true);
    }
  };

  // Effect to add 4 coins per second when bot is purchased
  useEffect(() => {
    let botInterval;
    if (isBotPurchased) {
      botInterval = setInterval(() => {
        setCoins((prevCoins) => prevCoins + 4);
      }, 1000);
    }

    return () => clearInterval(botInterval);
  }, [isBotPurchased]);

  return (
    <div className={`app-container ${isBoostActive ? "boost-active" : ""}`}>
      <div className="black-background"></div>
      <div>
        <div className={`coins-display ${isBoostActive ? "hidden" : ""}`}>
          {formatNumberWithCommas(coins)}
        </div>
        <div className={`energy-display ${isBoostActive ? "hidden" : ""}`}>
          {`${energy} / ${maxEnergy}`}
        </div>
        {!isBoostActive && <hr className="divider" />}

        <div className={`clicker-container ${isBoostActive ? "hidden" : ""}`}>
          <img
            src={clickerImage}
            className="clicker-image"
            alt="Clicker"
            draggable="false"
            onTouchStart={(event) => {
              event.preventDefault();
              if (energy >= coinsPerClick || isClickBoostActive) {
                handleButtonClick();
              }
            }}
          />
        </div>
      </div>
      {isBoostActive && (
        <div className="boost-text">
          <button className="back-button" onClick={handleBackClick}>
            Назад
          </button>
        </div>
      )}
      <div className="bottom-buttons">
        <button
          className="button boost-button"
          onClick={handleBoostClick}
          disabled={isBoostActive}
        >
          <span className="boosttextbtn">Ускорение</span>
        </button>
        <button
          className="button missions-button"
          onClick={handleMissionsClick}
        >
          <span className="missiontextbtn">Миссии</span>
        </button>
        <button
          className="button referral-button"
          onClick={handleReferralClick}
        >
          <span className="referaltextbtn">Рефералы</span>
        </button>
        {isBoostActive && !isClickBoostActive && (
          <button
            className="button click-boost-button"
            onClick={activateClickBoost}
            disabled={isClickBoostActive || clickBoost === 0}
          >
            <span className="clickboosttextbtn">
              Ускорение 5x: {clickBoost}/3
            </span>
          </button>
        )}
        {isBoostActive && !isClickBoostActive && (
          <button
            className="button upgrade-coins-per-click-button"
            onClick={handleUpgradeCoinsPerClick}
            disabled={coins < coinsPerClickUpgradeCost}
          >
            <span className="upgrade-coins-per-click-text">
              Улучшение клика
            </span>{" "}
            <br />
            <span>Уровень: {coinsPerClickUpgradeLevel}</span>
            <br />
            <span>Стоимость: {coinsPerClickUpgradeCost}</span>
          </button>
        )}
        {isBoostActive && (
          <button
            className="button upgrade-max-energy-button" // Добавляем кнопку для улучшения максимальной энергии
            onClick={handleUpgradeMaxEnergy}
            disabled={coins < maxEnergyUpgradeCost}
          >
            <span className="upgrade-max-energy-text">
              Увеличение макс. энергии
            </span>{" "}
            <br />
            <span>Уровень: {maxEnergyUpgradeLevel}</span>
            <br />
            <span>Стоимость: {maxEnergyUpgradeCost}</span>
          </button>
        )}
        {isBoostActive && (
          <button
            className="button restore-energy-button"
            onClick={handleRestoreEnergy}
            disabled={restoreEnergy === 0}
          >
            <span className="restoreenergytextbtn">Топливный бак: </span>
            <span className="restoreenergytextbtn">{restoreEnergy}/3</span>
          </button>
        )}
        {isBoostActive && !isBotPurchased && (
          <button
            className="button buy-bot-button"
            onClick={handleBuyBot}
            disabled={coins < botCost}
          >
            <span className="buybottextbtn">Купить бота</span>
            <br />
            <span>Стоимость: {botCost}</span>
          </button>
        )}
      </div>
    </div>
  );
}

export default BeboClicker;
