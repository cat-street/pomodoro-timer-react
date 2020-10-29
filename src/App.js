import { useState, useCallback, useRef } from 'react';
import { BreakDisplay } from './BreakDisplay';
import { SessionDisplay } from './SessionDisplay';
import { TimerDisplay } from './TimerDisplay';
import { TimerButtons } from './TimerButtons';
import audio from './assets/audio.mp3';
import './App.css';

function App() {
  const [length, setLength] = useState({
    length: 1500,
    timer: 1500,
  });
  const [breakLength, setBreakLength] = useState(300);
  const [runningId, setRunningId] = useState(0);
  const [stage, setStage] = useState('Session');

  const audioSignal = useRef();
  let breakRunning = useRef(false);

  const INCREASE = 'INCREASE';
  const DECREASE = 'DECREASE';

  const changeLength = (modificator) => {
    if (runningId) return;
    const change = changeTime(modificator, length.length);
    setLength({
      length: change,
      timer: change,
    });
  };

  const changeBreak = (modificator) => {
    if (runningId) return;
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

  const switchTimer = useCallback(() => {
    let time;
    if (!breakRunning.current) {
      setStage('Break');
      time = breakLength + 1;
    } else {
      setStage('Session');
      time = length.length + 1;
    }
    breakRunning.current = !breakRunning.current;
    return time;
  }, [breakLength, length.length]);

  const startTimer = useCallback(() => {
    let timer = length.timer;

    if (!runningId) {
      const timeoutId = setInterval(() => {
        timer -= 1;
        setLength({
          ...length,
          timer: timer,
        });

        if (timer < 1) {
          timer = switchTimer();
          audioSignal.current.play();
        }
      }, 1000);
      setRunningId(timeoutId);
    } else {
      clearInterval(runningId);
      setRunningId(0);
    }
  }, [length, runningId, switchTimer]);

  const reset = useCallback(() => {
    audioSignal.current.currentTime = 0;
    audioSignal.current.pause();

    if (runningId) {
      clearInterval(runningId);
      setRunningId(0);
    }
    setLength({
      length: 1500,
      timer: 1500,
    });
    setBreakLength(300);
    setStage('Session');
  }, [runningId, audioSignal]);

  return (
    <div className="timer">
      <audio id="beep" ref={audioSignal} src={audio}></audio>
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
      <TimerDisplay time={length.timer} stage={stage} />
      <TimerButtons onStart={startTimer} onReset={reset} />
    </div>
  );
}

export default App;
