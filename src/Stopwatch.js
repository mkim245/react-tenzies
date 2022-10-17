import React from 'react';
import { useStopwatch } from 'react-timer-hook';

export default function MyStopwatch() {
  const {
    seconds,
    minutes,
    start,
    pause,
    reset,
  } = useStopwatch({ autoStart: false });


  return (
    <div>
      <div className="time">
      <span> {minutes} m</span>:<span> {seconds} s</span>
      </div>
      <button onClick={start}>Start</button>
      <button onClick={pause}>Stop</button>
      <button onClick={reset}>Reset</button>
    </div>
  );
}
