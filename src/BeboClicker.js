import React, { useState, useEffect, useRef } from "react";
import "./BeboClicker.css";
import clickerImage from "./clicker-image.png";

function formatNumberWithCommas(number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function BeboClicker() {
  const [coins, setCoins] = useState(0);
  const [isBoostActive, setIsBoostActive] = useState(false);
  const [upgradeLevel, setUpgradeLevel] = useState(1);
  const [energy, setEnergy] = useState(500);
  const [maxEnergy, setMaxEnergy] = useState(500);
  const [clickText, setClickText] = useState("");
  const [clickTextPosition, setClickTextPosition] = useState({ x: 0, y: 0 });

  const clickCountRef = useRef(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setEnergy((prevEnergy) => {
        const newEnergy = Math.min(prevEnergy + 1, maxEnergy);
        return newEnergy;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [maxEnergy]);

  useEffect(() => {
    if (clickCountRef.current > 0) {
      setCoins((prevCoins) => {
        const increment = clickCountRef.current;
        const newCoins = prevCoins + increment * upgradeLevel;
        return newCoins;
      });

      setEnergy((prevEnergy) => {
        const decrement = clickCountRef.current;
        const newEnergy = Math.max(prevEnergy - decrement, 0);
        return newEnergy;
      });

      clickCountRef.current = 0; // Сбрасываем количество кликов
    }
  }, [upgradeLevel]);

  const handleButtonClick = (event) => {
    clickCountRef.current += 1; // Увеличиваем количество кликов на каждом касании
    setCoins((prevCoins) => prevCoins + 1); // Увеличиваем монеты на 1 при каждом клике

    // Получаем координаты клика относительно изображения
    const rect = event.target.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    // Устанавливаем текст и его позицию для отображения
    setClickText("+1");
    setClickTextPosition({ x, y });

    // Скрываем текст через 0.4 секунды
    setTimeout(() => {
      setClickText("");
    }, 400);
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
      <div className="coins-display">{formatNumberWithCommas(coins)}</div>
      <div className="energy-display">{`${energy} / ${maxEnergy}`}</div>
      <hr className="divider" />
      <div className="clicker-container">
        <img
          src={clickerImage}
          className="clicker-image"
          alt="Clicker"
          draggable="false"
          onClick={handleButtonClick}
        />
        {clickText && (
          <div
            className="click-text"
            style={{ left: clickTextPosition.x, top: clickTextPosition.y }}
          >
            {clickText}
          </div>
        )}
      </div>

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
