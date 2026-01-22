import Die from "./Die";
import { useState } from "react";

export default function App() {

function generateAllNewDice() {
  return new Array(10)
    .fill(0)
    .map(() => Math.ceil(Math.random() * 6))
}

const [randArray, setRandArray] = useState(generateAllNewDice())

const diceNumbers = randArray.map(die => (
  <Die value={die} />
))

  return (
    <main>
      <div className="dice-container">
        {diceNumbers}
      </div>
    </main>
  );
}
