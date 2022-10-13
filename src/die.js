import React from "react"

export default function Die(props) {
  const styles = {
    backgroundColor: props.isHeld ? "#59E391" : "white"
  }

  function numberToDot(number) {
    if (number === 1) {
      return <span className="dot"></span>
    }
    if (number === 2) {
      return <><span className="dot"></span><span className="dot"></span></>
    }
    if (number === 3) {
      return <><span className="dot"></span><span className="dot"></span><span className="dot"></span></>
    }
    if (number === 4) {
      return <><span className="dot"></span><span className="dot"></span><span className="dot"></span><span className="dot"></span></>
    }
    if (number === 5) {
      return <><span className="dot"></span><span className="dot"></span><span className="dot"></span><span className="dot"></span><span className="dot"></span></>
    }
    if (number === 6) {
      return <><span className="dot"></span><span className="dot"></span><span className="dot"></span><span className="dot"></span><span className="dot"></span><span className="dot"></span></>
    }
  }


  return (
    <div className="die-face"
      style={styles}
      onClick={props.holdDice}
    >
      {numberToDot(props.value)}
    </div>
  )
}