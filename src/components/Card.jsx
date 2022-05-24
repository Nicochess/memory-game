import React from "react";
import cover from '../assets/cover.png'

const Card = ({ card, handleChoice, flipped, disabled }) => {
  const handleClick = () => {
    if (!disabled) {
      handleChoice(card);
    }
  };

  return (
    <div className="card">
      <div className={flipped ? "flipped" : ""}>
        <img className="front" src={card.src} alt="front card" />
        <img
          className="back"
          src={cover}
          onClick={handleClick}
          alt="back card"
        />
      </div>
    </div>
  );
};

export default Card;
