import Die from "./Die";
import { useState } from "react";
import { nanoid } from "nanoid";
import Confetti from 'react-confetti'

export default function App() {
  const [dice, setDice] = useState(() => generateAllNewDice());

  const gameWon = dice.every(die => die.isHeld && die.value === dice[0].value)

  function generateAllNewDice() {
    return new Array(10).fill(0).map(() => ({
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid(),
    }));
  }

  function newGame() {
    setDice(generateAllNewDice())
  }

  function hold(id) {
    setDice(
      dice.map(die => {
        return die.id === id ? { ...die, isHeld: !die.isHeld } : { ...die };
      }),
    );
  }

  function rollDice() {
    setDice(oldDice =>
      oldDice.map(die =>
        die.isHeld ? die : { ...die, value: Math.ceil(Math.random() * 6) },
      ),
    );
  }

  const diceElements = dice.map(die => (
    <Die
      key={die.id}
      value={die.value}
      isHeld={die.isHeld}
      func={hold}
      id={die.id}
    />
  ));

  return (
    <main>
      {gameWon && <Confetti width={1800} />}
      <h1 className="title">Tenzies</h1>
      <p className="instructions">
        Roll until all dice are the same. Click each die to freeze it at its
        current value between rolls.
      </p>
      <div className="dice-container">{diceElements}</div>
      <button className="roll-dice" onClick={gameWon ? newGame : rollDice}>
        {gameWon ? 'New Game' : 'Roll'}
      </button>
    </main>
  );
}
