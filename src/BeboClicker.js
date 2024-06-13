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
  const [coinsPerClick] = useState(1);
  const [isEnergyEnough, setIsEnergyEnough] = useState(true);

  const [energyPerSec] = useState(1);

  const clickCountRef = useRef(0);
  const clickTimerRef = useRef(null);

  useEffect(() => {
    setIsEnergyEnough(energy >= coinsPerClick);
  }, [energy, coinsPerClick]);

  useEffect(() => {
    const energyInterval = setInterval(() => {
      setEnergy((prevEnergy) => Math.min(prevEnergy + energyPerSec, maxEnergy));
    }, 1000);

    return () => clearInterval(energyInterval);
  }, [maxEnergy, energyPerSec]);

  const handleButtonClick = () => {
    if (energy >= coinsPerClick) {
      const clicks = clickCountRef.current;
      setCoins((prevCoins) => prevCoins + coinsPerClick * clicks);
      setEnergy((prevEnergy) => prevEnergy - coinsPerClick * clicks);
      clickCountRef.current = 0;
    }
  };

  const handleBoostClick = () => {
    setIsBoostActive(true);
    setTimeout(() => {
      setIsBoostActive(false);
    }, 30000);
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
      <div className="coins-display">{formatNumberWithCommas(coins)}</div>
      <div className="energy-display">{`${energy} / ${maxEnergy}`}</div>
      <hr className="divider" />
      <div className="clicker-container">
        <img
          src={clickerImage}
          className="clicker-image"
          alt="Clicker"
          draggable="false"
          onTouchStart={(event) => {
            event.preventDefault(); // Предотвращаем стандартное поведение браузера
            if (isEnergyEnough) {
              clickCountRef.current += 1;
              handleButtonClick();
            }
          }}
        />
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
