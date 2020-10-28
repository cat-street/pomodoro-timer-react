import { useState } from 'react';
import { BreakDisplay } from './BreakDisplay';
import { SessionDisplay } from './SessionDisplay';
import { TimerDisplay } from './TimerDisplay';
import { TimerButtons } from './TimerButtons';
import './App.css';

function App() {
  const [length, setLength] = useState({
    length: 1500,
    timer: 1500
  });
  const [breakLength, setBreakLength] = useState(300);

  const INCREASE = 'INCREASE';
  const DECREASE = 'DECREASE';

  const changeLength = (modificator) => {
    const change = changeTime(modificator, length.length);
    setLength({
      length: change,
      timer: change
    });
  };

  const changeBreak = (modificator) => {
    setBreakLength(changeTime(modificator, breakLength));
  };

  const changeTime = (modificator, state) => {
    if (modificator === INCREASE) {
      if (state >= 3600) {
        return 3600;
      }
      return state + 60;
    } else if (modificator === DECREASE) {
      if (state <= 60) {
        return 60;
      }
      return state - 60;
    }
  };

  let startTimer = () => {
    setTimeout(function start() {
      setLength({
        length: length.length,
        timer: length.timer - 60
      });
      startTimer = setTimeout(start, 1000);
    }, 1000);
  }

  return (
    <div className="timer">
      <div className="timer__upper">
        <BreakDisplay
          time={breakLength}
          onChange={changeBreak}
          modificator={{ INCREASE, DECREASE }}
        />
        <SessionDisplay
          time={length.length}
          onChange={changeLength}
          modificator={{ INCREASE, DECREASE }}
        />
      </div>
      <TimerDisplay time={length.timer} />
      <TimerButtons onStart={startTimer} />
    </div>
  );
}

export default App;
