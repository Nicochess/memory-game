import { useEffect, useState } from "react";
import Confetti from "react-confetti";
import "./App.css";
import Card from "./components/Card";

const cardImages = [
  { src: "/img/helmet-1.png", matched: false },
  { src: "/img/potion-1.png", matched: false },
  { src: "/img/ring-1.png", matched: false },
  { src: "/img/scroll-1.png", matched: false },
  { src: "/img/shield-1.png", matched: false },
  { src: "/img/sword-1.png", matched: false },
];

function App() {
  const [cards, setCards] = useState([]);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disable, setDisable] = useState(false);
  const [memorizing, setMemorizing] = useState(null);
  const [confetti, setConfetti] = useState(false);

  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));

    setMemorizing(true);
    setChoiceOne(null);
    setChoiceTwo(null);
    setConfetti(false)
    setCards(shuffledCards);
    setTimeout(() => setMemorizing(false), 3000);
  };

  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  };

  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setDisable(false);
  };

  const gameWon = () => {
    const allMatch = cards.filter((card) => card.matched === true);

    if (cards.length > 0 && allMatch.length === cards.length) {
      setConfetti(true);
    }
  };

  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisable(true);
      if (choiceOne.src === choiceTwo.src) {
        setCards((prevCards) =>
          prevCards.map((card) => {
            if (card.src === choiceOne.src) {
              return { ...card, matched: true };
            } else {
              return card;
            }
          })
        );
        resetTurn();
        return;
      }
      setTimeout(() => resetTurn(), 1000);
    }
    gameWon();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [choiceOne, choiceTwo]);

  return (
    <div className="App">
      <h1>Magic Match</h1>
      <button onClick={shuffleCards}>New Game</button>

      {confetti && (
        <Confetti width={window.innerWidth - 20} height={window.innerHeight} />
      )}

      <div className="card-grid">
        {cards.map((card) => (
          <Card
            key={card.id}
            card={card}
            handleChoice={handleChoice}
            flipped={
              card === choiceOne ||
              card === choiceTwo ||
              card.matched ||
              memorizing
            }
            disabled={disable}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
