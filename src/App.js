import React from "react"
// import ReactDOM from 'react-dom';
import Die from "./die"
import './style.css';
import { nanoid } from "nanoid"
import Confetti from "react-confetti"
import MyStopwatch from "./Stopwatch";
import Ranking from "./Rank";
import { useStopwatch } from 'react-timer-hook';

const { uniqueNamesGenerator, adjectives, colors, animals } = require('unique-names-generator');
function App() {
  const [dice, setDice] = React.useState(allNewDice());
  const [tenzies, setTenzies] = React.useState(false);
  const [countRoll, setCountRoll] = React.useState(0);
  const [playTime, setPlayTime] = React.useState(0)
  const [players, setPlayers] = React.useState(
    () => JSON.parse(localStorage.getItem("players")) || []
  )
  const [currentPlayerId, setCurrentPlayerId] = React.useState(
    (players[0] && players[0].id) || ""
  )
  const shortName = uniqueNamesGenerator({
    dictionaries: [animals, colors],
    length: 1
  });

  const {
    seconds,
    minutes,
    start,
    pause,
    reset,
  } = useStopwatch({ autoStart: true });

  function createNewPlayer() {
    const newPlayer = {
      id: nanoid(),
      name: shortName,
      time: playTime,
      roll: countRoll,
    }
    setPlayers(prevPlayer => [newPlayer, ...prevPlayer])
    setCurrentPlayerId(newPlayer.id)
  }

  function deletePlayer(event, playerId) {
    event.stopPropagation()
    console.log("delete note", playerId)
    setPlayers(oldPlayers => oldPlayers.filter(player => player.id !== playerId))
  }

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
      setCountRoll(countRoll + 1)
    } else {
      setTenzies(false)
      setDice(allNewDice())
      setCountRoll(0)
    }
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
    localStorage.setItem("players", JSON.stringify(players))
    const allHeld = dice.every(die => die.isHeld)
    const firstValue = dice[0].value
    const allSameValue = dice.every(die => die.value === firstValue)
    if (countRoll === 0) {
      reset();
    }
    if (allHeld && allSameValue) {
      setTenzies(true)
      // alert(`You did! You rolled ${countRoll} times`)
      players[0].time = minutes * 60 + seconds
      players[0].roll = countRoll
      pause()
      setCountRoll(0)
    }
  }, [dice, playTime])

  return (
    <main>
      {tenzies && <Confetti />}
      <div className="containers">
        <h1 className="title">Tenzies</h1>
        <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
        <div className="dice-container">
          {dieElements}
        </div>
        <div>[Roll Button]</div>
        <button
          className="roll-dice"
          onClick={rollDice}
        >
          {tenzies ? "New Game" : `Roll (${countRoll})`}
        </button>
        <div>[Timer]</div>
        <MyStopwatch
        seconds={seconds}
        minutes={minutes}
          start={start}
          pause={pause}
          reset={reset}
        />
      </div>
      <div>
        <Ranking
          players={players}
          // setCurrentPlayerId={setCurrentPlayerId}
          newPlayer={createNewPlayer}
          deletePlayer={deletePlayer}
        />
      </div>
    </main>
  );
}

export default App;
