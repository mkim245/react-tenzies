import React from "react"

export default function Die(props) {
  const styles = {
    backgroundColor: props.isHeld ? "#59E391" : "white"
  }

  function numberToDot(number) {
    if (number === 1) {
      return <div className="dice1" style={styles}
        onClick={props.holdDice}>
        <span className="dot"></span>
      </div>
    }
    if (number === 2) {
      return <><div className="dice2" style={styles}
        onClick={props.holdDice}>
        <span className="dot"></span>
        <span className="dot"></span>
      </div></>
    }
    if (number === 3) {
      return <><div className="dice3" style={styles}
        onClick={props.holdDice}>
        <span className="dot"></span>
        <span className="dot"></span>
        <span className="dot"></span>
      </div></>
    }
    if (number === 4) {
      return <><div className="dice4" style={styles}
        onClick={props.holdDice}>
        <div class="column">
          <span className="dot"></span>
          <span className="dot"></span></div>
        <div class="column">
          <span className="dot"></span>
          <span className="dot"></span></div>
      </div></>
    }
    if (number === 5) {
      return <><div className="dice5" style={styles}
        onClick={props.holdDice}>
        <div class="column">
          <span className="dot"></span>
          <span className="dot"></span></div>
        <div class="column">
          <span className="dot"></span></div>
        <div class="column">
          <span className="dot"></span>
          <span className="dot"></span></div>
      </div></>
    }
    if (number === 6) {
      return <><div className="dice6" style={styles}
        onClick={props.holdDice}>
        <div class="column">
          <span className="dot"></span>
          <span className="dot"></span>
          <span className="dot"></span></div>
        <div class="column">
          <span className="dot"></span>
          <span className="dot"></span>
          <span className="dot"></span></div>
      </div></>
    }
  }


  return (
    // <div className="die-face"
    //   style={styles}
    //   onClick={props.holdDice}
    // >
    <>{numberToDot(props.value)}</>
    // </div>
  )
}