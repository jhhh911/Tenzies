import Die from "./Die";
import { useState } from "react";
import { nanoid } from "nanoid";

export default function App() {
  const [dice, setDice] = useState(generateAllNewDice());

  function generateAllNewDice() {
    return new Array(10).fill(0).map(() => ({
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid(),
    }));
  }

  function hold(id) {
    setDice(dice.map(die => {
      return die.id === id ? {...die, isHeld: !die.isHeld} : {...die}
    }))
  }

function rollDice() {
  setDice(oldDice => oldDice.map(die =>
    die.isHeld ? die : {...die, value: Math.ceil(Math.random() * 6)}
  ))
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
      <div className="dice-container">{diceElements}</div>
      <button
        className="roll-dice"
        onClick={rollDice}
      >
        Roll
      </button>
    </main>
  );
}
