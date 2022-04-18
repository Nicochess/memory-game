import React from "react";

const Card = ({ src, handleChoice }) => {
  const handleClick = () => {
    handleChoice(src);
  };

  return (
    <div className="card">
      <div>
        <img className="front" src={src} alt="front card" />
        <img
          className="back"
          src="/img/cover.png"
          onClick={handleClick}
          alt="back card"
        />
      </div>
    </div>
  );
};

export default Card;
