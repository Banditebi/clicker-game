import React, { useEffect } from "react";
import "./bebodrop.css";
import beboDropImage from "./bebo-drop.png"; // Импортируйте ваше изображение bebo-drop

const BeboDrop = ({ id, left, top, onAnimationEnd }) => {
  useEffect(() => {
    const timeout = setTimeout(() => {
      onAnimationEnd(id);
    }, 2000); // Устанавливаем время анимации на 2 секунды

    return () => clearTimeout(timeout);
  }, [id, onAnimationEnd]);

  return (
    <div className="bebo-drop" style={{ left, top: "0px" }}>
      <img src={beboDropImage} alt="Bebo Drop" className="bebo-drop-image" />
    </div>
  );
};

export default BeboDrop;
