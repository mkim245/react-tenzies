import React from 'react';

export default function MyStopwatch(props) {

return (
  <div>
    <div className="time">
      <span> {props.minutes} m</span>:<span> {props.seconds} s</span>
    </div>
    <button onClick={props.start}>Start</button>
    <button onClick={props.pause}>Stop</button>
    <button onClick={props.reset}>Reset</button>
  </div>
);
}
