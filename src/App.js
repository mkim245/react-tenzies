import React from "react"
import Die from "./die"
import './style.css';

function App() {
  const [dice, setDice] = React.useState(allNewDice());

  function allNewDice() {
    const newDice = [];
    for (let i = 0; i < 10; i++) {
      newDice.push(Math.floor(Math.random() * 6) + 1);
    }
    return newDice;
  }

  function rollDice() {
    setDice(allNewDice())
  }

  const dieElements = dice.map(die => <Die value={die} />)

  return (
    <main>
      <div className="dice-container">
        {dieElements}
      </div>
      <button className="roll-dice" onClick={rollDice}>Roll</button>
    </main>
  );
}

export default App;
