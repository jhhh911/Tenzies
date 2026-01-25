import Die from "./Die";
import { useState, useRef, useEffect } from "react";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";

export default function App() {
  const [dice, setDice] = useState(() => generateAllNewDice());

  const gameWon = dice.every(die => die.isHeld && die.value === dice[0].value);

  const buttonRef = useRef(null);

  useEffect(() => {
    if(gameWon) {
      buttonRef.current.focus()
    }
  }, [gameWon])

  

  function generateAllNewDice() {
    return new Array(10).fill(0).map(() => ({
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid(),
    }));
  }

  function hold(id) {
    setDice(
      dice.map(die => {
        return die.id === id ? { ...die, isHeld: !die.isHeld } : { ...die };
      }),
    );
  }

  function rollDice() {
    if (!gameWon) {
      setDice(oldDice =>
        oldDice.map(die =>
          die.isHeld ? die : { ...die, value: Math.ceil(Math.random() * 6) },
        ),
      );
    } else {
      setDice(generateAllNewDice());
    }
  }

  const diceElements = dice.map(die => (
    <Die
      key={die.id}
      value={die.value}
      isHeld={die.isHeld}
      hold={() => hold(die.id)}
      id={die.id}
    />
  ));

  return (
    <main>
      {gameWon && <Confetti width={1800} />}
      <div aria-live="polite" className="sr-only">
        {gameWon && <p>You Won! Press 'New Game' to start again.</p>}
      </div>
      <h1 className="title">Tenzies</h1>
      <p className="instructions">
        Roll until all dice are the same. Click each die to freeze it at its
        current value between rolls.
      </p>
      <div className="dice-container">{diceElements}</div>
      <button className="roll-dice" onClick={rollDice} ref={buttonRef}>
        {gameWon ? "New Game" : "Roll"}
      </button>
    </main>
  );
}
