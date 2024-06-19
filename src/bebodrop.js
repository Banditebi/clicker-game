import React, { useEffect } from "react";
import "./bebodrop.css";
import beboguy2 from "./beboguy2.png";

const BeboDrop = ({ id, left, onAnimationEnd }) => {
  useEffect(() => {
    const timeout = setTimeout(() => {
      onAnimationEnd(id);
    }, 1500); // Устанавливаем время анимации на 1.5 секунды

    return () => clearTimeout(timeout);
  }, [id, onAnimationEnd]);

  return (
    <div className="bebo-drop" style={{ left }}>
      <img src={beboguy2} alt="Bebo Drop" className="bebo-drop-image" />
    </div>
  );
};

export default BeboDrop;
