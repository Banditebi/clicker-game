import React, { useState, useEffect, useRef } from "react";
import "./BeboClicker.css";
import clickerImage from "./clicker-image.png";

function formatNumberWithCommas(number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function BeboClicker() {
  const [coins, setCoins] = useState(0);
  const [isBoostActive, setIsBoostActive] = useState(false);
  const [energy, setEnergy] = useState(500);
  const [maxEnergy, setMaxEnergy] = useState(500);
  const [coinsPerClick, setCoinsPerClick] = useState(1);
  const [isEnergyEnough, setIsEnergyEnough] = useState(true);
  const [energyPerSec] = useState(1);
  const [clickBoost, setClickBoost] = useState(3);
  const [maxClickBoost, setMaxClickBoost] = useState(3);
  const [isClickBoostActive, setIsClickBoostActive] = useState(false);
  const [boostDuration, setBoostDuration] = useState(20);

  const [restoreEnergy, setRestoreEnergy] = useState(3); // Добавляем состояние для восстановления энергии

  const clickCountRef = useRef(0);

  useEffect(() => {
    setIsEnergyEnough(energy >= coinsPerClick * clickBoost);
  }, [energy, coinsPerClick, clickBoost]);

  useEffect(() => {
    const energyInterval = setInterval(() => {
      if (!isClickBoostActive) {
        setEnergy((prevEnergy) =>
          Math.min(prevEnergy + energyPerSec, maxEnergy)
        );
      }
    }, 1000);

    return () => clearInterval(energyInterval);
  }, [maxEnergy, energyPerSec, isClickBoostActive]);

  const activateClickBoost = () => {
    if (!isClickBoostActive && clickBoost > 0) {
      setCoinsPerClick((prevCoinsPerClick) => prevCoinsPerClick * 5);
      setClickBoost((prevClickBoost) => prevClickBoost - 1);
      setMaxClickBoost((prevMaxClickBoost) => prevMaxClickBoost - 1);
      setIsClickBoostActive(true);
      setIsBoostActive(false);

      setTimeout(() => {
        setCoinsPerClick(1);
        setIsClickBoostActive(false);
      }, boostDuration * 1000);
    }
  };

  const handleButtonClick = () => {
    if (isEnergyEnough) {
      if (clickCountRef.current > 0) {
        setCoins((prevCoins) => prevCoins + coinsPerClick);
        if (!isClickBoostActive) {
          setEnergy((prevEnergy) => prevEnergy - coinsPerClick);
        }
        clickCountRef.current = 0;
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
    // Handle missions button click action
  };

  const handleReferralClick = () => {
    // Handle referral button click action
  };

  const handleRestoreEnergy = () => {
    if (restoreEnergy > 0) {
      setEnergy(maxEnergy);
      setRestoreEnergy((prevRestoreEnergy) => prevRestoreEnergy - 1);
      setIsBoostActive(false); // Set isBoostActive to false
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
          <span className="referaltextbtn">Referrals</span>
        </button>
        {isBoostActive && !isClickBoostActive && (
          <button
            className="button click-boost-button"
            onClick={() => activateClickBoost(setClickBoost, setMaxClickBoost)}
            disabled={isClickBoostActive || clickBoost === 0}
          >
            <span className="clickboosttextbtn">Boost 5x: {clickBoost}/3</span>
          </button>
        )}
        {isBoostActive && (
          <button
            className="button restore-energy-button"
            onClick={handleRestoreEnergy}
            disabled={restoreEnergy === 0} // Делаем кнопку неактивной, если restoreEnergy равно 0
          >
            <span className="restoreenergytextbtn">Energy Tank: </span>
            <span className="restoreenergytextbtn">{restoreEnergy}/3</span>
          </button>
        )}
      </div>
      <hr className="divider" />
    </div>
  );
}

export default BeboClicker;
