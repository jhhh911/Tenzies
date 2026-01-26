import Die from "./Die";
import React from "react";
import { nanoid } from 'nanoid';
import ReactConfetti from "react-confetti";

export default function App() {

const [dice, setDice] = React.useState(() => generateAllNewDice())
const [count, setCount] = React.useState(0)

  const gameWon = dice.every(die => die.isHeld && die.value === dice[0].value)

  function generateAllNewDice() {
    return new Array(10)
      .fill(0)
      .map(() => {
        return {
          value: Math.ceil(Math.random() * 6),
          isHeld: false,
          id: nanoid()
        }
      })
  }

  const diceElements = dice.map(die => {
    return <Die value={die.value} key={die.id} id={die.id} isHeld={die.isHeld} hold={() => hold(die.id)}/>
   })

   function hold(id) {
    setDice(oldDice => oldDice.map(die =>
      die.id === id ? {...die, isHeld: !die.isHeld} : die
    ))
   }

  function rollDice() {
    
    if (gameWon) {
      setCount(0)
      setDice(generateAllNewDice())
    } else {
      setCount(prev => prev + 1)
      setDice(oldDice => oldDice.map(die =>
      die.isHeld? die : {...die, value: Math.ceil(Math.random() * 6)}
      ))
    }
  }


  return (
    <main>
      {gameWon && <ReactConfetti style={{width: '100%'}}/>}
      <h1>Tenzi</h1>
      <p>
        Roll until all dice are the same. Click each die to freeze it at its
        current value between rolls. Try to get the fastest time!
      </p>
      <section className="score">
        <div className="rolls">
          <p>Rolls</p>
          <p>{count}</p>
        </div>
        <div className="best-time">
          <p>Best Time</p>
          <p>0</p>
        </div>
        <div className="time">
          <p>Time</p>
          <p>0</p>
        </div>
      </section>
      <section className="container">
      {diceElements}
      </section>
      <button className="roll" onClick={rollDice}>{gameWon ? 'New Game' : 'Roll'}</button>
    </main>
  );
}
