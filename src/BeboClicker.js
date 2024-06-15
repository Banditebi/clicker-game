import React, { useState, useEffect, useRef } from "react";
import "./BeboClicker.css";
import clickerImage from "./clicker-image.png";

function formatNumberWithCommas(number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function BeboClicker() {
  const [coins, setCoins] = useState(2500);
  const [isBoostActive, setIsBoostActive] = useState(false);
  const [energy, setEnergy] = useState(500);
  const [maxEnergy, setMaxEnergy] = useState(500);
  const [coinsPerClick, setCoinsPerClick] = useState(1);
  const [initialCoinsPerClick, setInitialCoinsPerClick] = useState(1);
  const [isEnergyEnough, setIsEnergyEnough] = useState(true);
  const [clickBoost, setClickBoost] = useState(3);
  const [maxClickBoost, setMaxClickBoost] = useState(3);
  const [isClickBoostActive, setIsClickBoostActive] = useState(false);
  const [boostDuration, setBoostDuration] = useState(20);
  const [restoreEnergy, setRestoreEnergy] = useState(3);

  const [coinsPerClickUpgradeLevel, setCoinsPerClickUpgradeLevel] = useState(1);
  const [coinsPerClickUpgradeCost, setCoinsPerClickUpgradeCost] = useState(500);

  const clickCountRef = useRef(0);

  // Функция для восстановления энергии
  const restoreEnergyPerSecond = () => {
    if (energy < maxEnergy) {
      setEnergy((prevEnergy) => Math.min(prevEnergy + 1, maxEnergy));
    }
  };

  // Устанавливаем интервал для восстановления энергии каждую секунду
  useEffect(() => {
    const interval = setInterval(() => {
      restoreEnergyPerSecond();
    }, 1000);

    return () => clearInterval(interval);
  }, [energy, maxEnergy]);

  const activateClickBoost = () => {
    if (!isClickBoostActive && clickBoost > 0) {
      setInitialCoinsPerClick(coinsPerClick);
      const boostedCoinsPerClick = coinsPerClick * 5;

      setClickBoost((prevClickBoost) => prevClickBoost - 1);
      setMaxClickBoost((prevMaxClickBoost) => prevMaxClickBoost - 1);
      setIsClickBoostActive(true);
      setIsBoostActive(false);

      setTimeout(() => {
        // Восстанавливаем изначальное значение coinsPerClick после окончания буста
        setCoinsPerClick(initialCoinsPerClick);
        setIsClickBoostActive(false);
      }, boostDuration * 1000);

      // Повышаем coinsPerClick только после установки таймаута
      setCoinsPerClick(boostedCoinsPerClick);
    }
  };

  const handleButtonClick = () => {
    if (isEnergyEnough && (!isClickBoostActive || energy >= coinsPerClick)) {
      const currentCoinsPerClick = isClickBoostActive
        ? coinsPerClick * 5
        : coinsPerClick;
      setCoins((prevCoins) => prevCoins + currentCoinsPerClick);
      if (!isClickBoostActive) {
        setEnergy((prevEnergy) => prevEnergy - currentCoinsPerClick);
      }
      clickCountRef.current = 0;
    }
  };

  const handleBoostClick = () => {
    setIsBoostActive(true);
  };

  const handleBackClick = () => {
    setIsBoostActive(false);
  };

  const handleMissionsClick = () => {
    // Обработка нажатия кнопки "Миссии"
  };

  const handleReferralClick = () => {
    // Обработка нажатия кнопки "Рефералы"
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
              if (isEnergyEnough) {
                clickCountRef.current += 1;
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
            className="button restore-energy-button"
            onClick={handleRestoreEnergy}
            disabled={restoreEnergy === 0}
          >
            <span className="restoreenergytextbtn">Топливный бак: </span>
            <span className="restoreenergytextbtn">{restoreEnergy}/3</span>
          </button>
        )}
      </div>
      <hr className="divider" />
    </div>
  );
}

export default BeboClicker;
