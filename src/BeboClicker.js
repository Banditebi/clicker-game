import React, { useState, useEffect } from "react";
import "./BeboClicker.css";
import clickerImage from "./clicker-image.png";
import Navigation from "./Navigation";

const tg = window.Telegram.WebApp;

function BeboClicker() {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [coins, setCoins] = useState(() => {
    const savedCoins = JSON.parse(localStorage.getItem("coins"));
    return savedCoins !== null ? savedCoins : 0;
  });
  const initialEnergy = 500;
  const [energy, setEnergy] = useState(initialEnergy);

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

  return (
    <div className="bebo-clicker">
      <h1>$BEBO</h1>
      <p>Coins: {coins.toLocaleString()}</p>
      <img
        src={clickerImage}
        alt="Clicker"
        className="clicker-image"
        onClick={() => {
          setCoins(coins + 5);
          setEnergy(energy - 5);
        }}
      />
      <p className="energy">{energy}/500</p>
      <Navigation
        isOpen={isNavOpen}
        toggleNav={() => setIsNavOpen(!isNavOpen)}
      />
    </div>
  );
}

export default BeboClicker;
