import React from "react"
import Die from "./die"
import './style.css';
import { nanoid } from "nanoid"
import Confetti from "react-confetti"

function App() {
  const [dice, setDice] = React.useState(allNewDice());
  const [tenzies, setTenzies] = React.useState(false);
  const [countRoll, setCountRoll] = React.useState(1);

  function generateNewDie() { //helper function
    return {
      value: Math.floor(Math.random() * 6) + 1,
      isHeld: false,
      id: nanoid()
    }
  }

  function allNewDice() {
    const newDice = [];
    for (let i = 0; i < 10; i++) {
      newDice.push(generateNewDie())
    }
    return newDice;
  }

  function rollDice() {
    if (!tenzies) {
      setDice(oldDice => oldDice.map(die => {
        return die.isHeld
          ? die
          : generateNewDie()
      }))
    } else {
      setTenzies(false)
      setDice(allNewDice())
    }
    setCountRoll(countRoll + 1)
  }

  function holdDice(id) {
    setDice(oldDice => oldDice.map(die => {
      return die.id === id
        ? { ...die, isHeld: !die.isHeld }
        : die
    }))
  }

  const dieElements = dice.map(die => (
    <Die
      key={die.id}
      value={die.value}
      isHeld={die.isHeld}
      holdDice={() => holdDice(die.id)}
    />
  ))

  React.useEffect(() => {
    const allHeld = dice.every(die => die.isHeld)
    const firstValue = dice[0].value
    const allSameValue = dice.every(die => die.value === firstValue)
    if (allHeld && allSameValue) {
      setTenzies(true)
      console.log("You won!")
      setCountRoll(0)
    }
  }, [dice])

  return (
    <main>
      {tenzies && <Confetti />}
      <h1 className="title">Tenzies</h1>
      <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
      <div className="dice-container">
        {dieElements}
      </div>
      <button
        className="roll-dice"
        onClick={rollDice}
      >
        {tenzies ? "New Game" : `Roll (${countRoll})`}
      </button>
      <div className="time">
        <span className="seconds">00</span>:<span className="tens">00</span>
      </div>
    </main>
  );
}

export default App;
