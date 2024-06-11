import React, { useState, useEffect } from "react";
import "./BeboClicker.css";
import clickerImage from "./clicker-image.png";
import Navigation from "./Navigation";
import UpgradePage from "./UpgradePage";

const tg = window.Telegram.WebApp;

function BeboClicker() {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [coins, setCoins] = useState(() => {
    const savedCoins = JSON.parse(localStorage.getItem("coins"));
    return savedCoins !== null ? savedCoins : 0;
  });
  const initialEnergy = 500;
  const [energy, setEnergy] = useState(() => {
    const savedEnergy = JSON.parse(localStorage.getItem("energy"));
    return savedEnergy !== null ? savedEnergy : initialEnergy;
  });
  const [clickCount, setClickCount] = useState(0);
  const [showUpgradePage, setShowUpgradePage] = useState(false);

  useEffect(() => {
    localStorage.setItem("coins", JSON.stringify(coins));
  }, [coins]);

  useEffect(() => {
    localStorage.setItem("energy", JSON.stringify(energy));
  }, [energy]);

  useEffect(() => {
    const energyInterval = setInterval(() => {
      if (energy < initialEnergy) {
        setEnergy((prevEnergy) => prevEnergy + 1);
      }
    }, 1000);

    return () => clearInterval(energyInterval);
  }, [energy, initialEnergy]);

  useEffect(() => {
    if (energy > initialEnergy) {
      setEnergy(initialEnergy);
    }
  }, [energy, initialEnergy]);

  const handleClick = () => {
    if (clickCount < 5 && energy >= 5) {
      setCoins((prevCoins) => prevCoins + 5);
      setEnergy((prevEnergy) => prevEnergy - 5);
      setClickCount((prevClickCount) => prevClickCount + 1);
    }
  };

  useEffect(() => {
    const resetClickCount = setTimeout(() => {
      setClickCount(0);
    }, 200);

    return () => clearTimeout(resetClickCount);
  }, [clickCount]);

  const handleUpgradeClick = () => {
    setShowUpgradePage(true);
  };

  const handleBackClick = () => {
    setShowUpgradePage(false);
  };

  return (
    <div className="bebo-clicker">
      {!showUpgradePage ? (
        <>
          <h1>$BEBO</h1>
          <p>{coins.toLocaleString()}</p>
          <img
            src={clickerImage}
            alt="Clicker"
            className="clicker-image"
            onClick={handleClick}
          />
          <p className="energy">{energy}/500</p>
          <Navigation
            isOpen={isNavOpen}
            toggleNav={() => setIsNavOpen(!isNavOpen)}
            onUpgradeClick={handleUpgradeClick}
          />
        </>
      ) : (
        <UpgradePage coins={coins} onBackClick={handleBackClick} />
      )}
    </div>
  );
}

export default BeboClicker;
