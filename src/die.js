import React from "react"

export default function Die(props) {
  const styles = {
    backgroundColor: props.isHeld ? "#59E391" : "white"
  }

  function numberToDot(number) {
    if (number === 1) {
      return "A"
    }
    if (number === 2) {
      return "B"
    }
    if (number === 3) {
      return "C"
    }
    if (number === 4) {
      return "D"
    }
    if (number === 5) {
      return "E"
    }
    if (number === 6) {
      return "F"
    }
  }


  return (
    <div className="die-face"
      style={styles}
      onClick={props.holdDice}
    >
      {/* <h2 className="die-num">{props.value}</h2> */}
      <span
        className={props.value === 1 ? "dot" : "die-num"}
      >
        {numberToDot(props.value)}
      </span>
    </div>
  )
}