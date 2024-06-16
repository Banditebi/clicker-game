import React, { useState, useEffect, useRef } from "react";
import { db } from "./firebase";
import { collection, getDocs, setDoc, doc } from "firebase/firestore";
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

  // Function to save coins to Firestore
  const saveCoinsToFirestore = async (newCoins) => {
    try {
      const userDoc = doc(db, "users", "user1"); // Replace "user1" with your user's ID
      await setDoc(
        userDoc,
        {
          coins: newCoins,
          energy,
          maxEnergy,
          coinsPerClick,
          clickBoost,
          maxClickBoost,
          isClickBoostActive,
          boostDuration,
          restoreEnergy,
          coinsPerClickUpgradeLevel,
          coinsPerClickUpgradeCost,
          maxEnergyUpgradeLevel,
          maxEnergyUpgradeCost,
          isBotPurchased,
          botCost,
        },
        { merge: true }
      );
    } catch (error) {
      console.error("Error saving data to Firestore:", error);
    }
  };

  // Function to load data from Firestore
  const loadDataFromFirestore = async () => {
    try {
      const userDoc = doc(db, "users", "user1");
      const docSnapshot = await getDoc(userDoc);

      if (docSnapshot.exists()) {
        const data = docSnapshot.data();
        setCoins(data.coins || 250000);
        setEnergy(data.energy || 500);
        setMaxEnergy(data.maxEnergy || 500);
        setCoinsPerClick(data.coinsPerClick || 15);
        setClickBoost(data.clickBoost || 3);
        setMaxClickBoost(data.maxClickBoost || 3);
        setIsClickBoostActive(data.isClickBoostActive || false);
        setBoostDuration(data.boostDuration || 20);
        setRestoreEnergy(data.restoreEnergy || 3);
        setCoinsPerClickUpgradeLevel(data.coinsPerClickUpgradeLevel || 1);
        setCoinsPerClickUpgradeCost(data.coinsPerClickUpgradeCost || 500);
        setMaxEnergyUpgradeLevel(data.maxEnergyUpgradeLevel || 1);
        setMaxEnergyUpgradeCost(data.maxEnergyUpgradeCost || 2500);
        setIsBotPurchased(data.isBotPurchased || false);
        setBotCost(data.botCost || 200000);
      }
    } catch (error) {
      console.error("Error loading data from Firestore:", error);
    }
  };

  useEffect(() => {
    loadDataFromFirestore();
  }, []);

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
      saveCoinsToFirestore(coins);
    }
  };

  const handleButtonClick = () => {
    if (energy >= coinsPerClick || isClickBoostActive) {
      const currentCoinsPerClick = isClickBoostActive
        ? coinsPerClick * 5
        : coinsPerClick;
      const newCoins = coins + currentCoinsPerClick;
      setCoins(newCoins);
      saveCoinsToFirestore(newCoins); // Save coins to Firestore
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
      const newCoins = coins - coinsPerClickUpgradeCost;
      setCoins(newCoins);
      saveCoinsToFirestore(newCoins); // Save coins to Firestore
      setCoinsPerClick((prevCoinsPerClick) => prevCoinsPerClick + 1);
      setCoinsPerClickUpgradeLevel((prevLevel) => prevLevel + 1);
      setCoinsPerClickUpgradeCost((prevCost) => prevCost * 2);
    }
  };

  const handleUpgradeMaxEnergy = () => {
    if (coins >= maxEnergyUpgradeCost) {
      const newCoins = coins - maxEnergyUpgradeCost;
      setCoins(newCoins);
      saveCoinsToFirestore(newCoins); // Save coins to Firestore
      setMaxEnergy((prevMaxEnergy) => prevMaxEnergy + 500); // Increase max energy by 500
      setMaxEnergyUpgradeLevel((prevLevel) => prevLevel + 1);
      setMaxEnergyUpgradeCost((prevCost) => prevCost * 2);
    }
  };

  const handleBuyBot = () => {
    if (!isBotPurchased && coins >= botCost) {
      const newCoins = coins - botCost;
      setCoins(newCoins);
      saveCoinsToFirestore(newCoins); // Save coins to Firestore
      setIsBotPurchased(true);
    }
  };

  // Effect to add 4 coins per second when bot is purchased
  useEffect(() => {
    let botInterval;
    if (isBotPurchased) {
      botInterval = setInterval(() => {
        setCoins((prevCoins) => {
          const newCoins = prevCoins + 4;
          saveCoinsToFirestore(newCoins); // Save coins to Firestore
          return newCoins;
        });
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
            className="button upgrade-max-energy-button"
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
