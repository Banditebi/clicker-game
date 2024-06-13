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
  const [coinsPerClick, setCoinsPerClick] = useState(1); // Используем useState для coinsPerClick
  const [isEnergyEnough, setIsEnergyEnough] = useState(true);
  const [energyPerSec] = useState(1);
  const [clickBoost, setClickBoost] = useState(3); // Начальное значение усиления кликов
  const [maxClickBoost, setMaxClickBoost] = useState(3); // Максимальное значение усиления кликов
  const [isClickBoostActive, setIsClickBoostActive] = useState(false); // Состояние для отслеживания активности усиления кликов
  const [boostDuration, setBoostDuration] = useState(20); // Длительность усиления кликов в секундах

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

  // Функция для активации временного усиления кликов
  const activateClickBoost = () => {
    if (!isClickBoostActive && clickBoost > 0) {
      setCoinsPerClick((prevCoinsPerClick) => prevCoinsPerClick * 5); // Увеличиваем coinsPerClick
      setClickBoost((prevClickBoost) => prevClickBoost - 1); // Уменьшаем clickBoost
      setIsClickBoostActive(true);
      setIsBoostActive(false); // Устанавливаем isBoostActive в false

      // Установка таймера для возврата к исходному значению через boostDuration секунд
      setTimeout(() => {
        setCoinsPerClick(1); // Возвращаем исходное значение coinsPerClick
        setIsClickBoostActive(false);
      }, boostDuration * 1000);
    }
  };

  const handleButtonClick = () => {
    if (isEnergyEnough) {
      // Проверяем, было ли уже нажатие
      if (clickCountRef.current > 0) {
        setCoins((prevCoins) => prevCoins + coinsPerClick);
        if (!isClickBoostActive) {
          setEnergy((prevEnergy) => prevEnergy - coinsPerClick);
        }
        clickCountRef.current = 0; // Сбрасываем количество касаний после каждого нажатия
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
            onClick={activateClickBoost}
            disabled={isClickBoostActive || clickBoost === 0} // Делаем кнопку неактивной, если усиление кликов активно или clickBoost равен 0
          >
            <span className="clickboosttextbtn">Click Boost</span>
          </button>
        )}
      </div>
      <hr className="divider" />
    </div>
  );
}

export default BeboClicker;
