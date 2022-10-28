import React from "react"
import Die from "./die"
import './style.css';
import { nanoid } from "nanoid"
import Confetti from "react-confetti"
import MyStopwatch from "./Stopwatch";
import Ranking from "./Rank";
import { useStopwatch } from 'react-timer-hook';

const { uniqueNamesGenerator, colors, animals } = require('unique-names-generator');
function App() {
  const [dice, setDice] = React.useState(allNewDice());
  const [tenzies, setTenzies] = React.useState(false);
  const [gameStart, setGameStart] = React.useState(true);
  const [countRoll, setCountRoll] = React.useState(0);
  const [playTime, setPlayTime] = React.useState(0)
  const [autoStart, setAutoStart] = React.useState(false);
  const [players, setPlayers] = React.useState(
    () => JSON.parse(localStorage.getItem("players")) || []
  )

  const shortName = uniqueNamesGenerator({
    dictionaries: [animals, colors],
    length: 1
  });

  const {
    seconds,
    minutes,
    isRunning,
    start,
    pause,
    reset,
  } = useStopwatch({ autoStart: autoStart });

  function createNewPlayer() {
    const newPlayer = {
      id: nanoid(),
      name: shortName,
      time: playTime,
      roll: 0,
    }
    setPlayers(prevPlayer => [newPlayer, ...prevPlayer])
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
      setCountRoll((prevState) => {
        return prevState+1;
      }) // same as setCountRoll(countroll +1)
    } else {
      setTenzies(false)
      setDice(allNewDice())
      setCountRoll(1)
    }
    setGameStart(false)
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
    if (gameStart) {
      pause();
    } else if (countRoll === 1 && !isRunning) { //prevent reset from being fired at clicking dice
      reset();
    }
    if (allHeld && allSameValue) {
      setTenzies(true)
      setGameStart(false)
      players[0].time = minutes * 60 + seconds
      players[0].roll = countRoll
      pause()
      setCountRoll(1)
    }
  }, [dice, playTime])

  return (
    <main>
      {tenzies && <Confetti />}
      <div className="containers">
        <h1 className="title">Match Dice</h1>
        <p className="instructions">Rule: Roll until all dice are the same. Click each die to freeze it at its current value between rolls. Click (+) in the lower box to add a new player. Click a garbage icon to remove a player.</p>
        <div className="dice-container">
          {dieElements}
        </div>
        <div>[Roll Button]</div>
        <button
          className="roll-dice"
          onClick={rollDice}
        >
          {tenzies || gameStart ? "New Game" : `Roll (${countRoll})`}
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
          newPlayer={createNewPlayer}
          deletePlayer={deletePlayer}
        />
      </div>
    </main>
  );
}

export default App;
