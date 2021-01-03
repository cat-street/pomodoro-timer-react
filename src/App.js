import { useState, useCallback, useRef } from 'react';
import { BreakDisplay } from './BreakDisplay';
import { SessionDisplay } from './SessionDisplay';
import { TimerDisplay } from './TimerDisplay';
import { TimerButtons } from './TimerButtons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronUp,
  faChevronDown,
  faUndoAlt,
  faPlay,
  faPause,
} from '@fortawesome/free-solid-svg-icons';
import audio from './assets/audio.mp3';
import './App.css';
import './vendor/fonts.css';

function App() {
  const [length, setLength] = useState({
    length: 120,
    timer: 120,
  });
  const [breakLength, setBreakLength] = useState(120);
  const [runningId, setRunningId] = useState(0);
  const [stage, setStage] = useState('Session');

  const audioSignal = useRef();
  let breakRunning = useRef(false);

  const INCREASE = 'INCREASE';
  const DECREASE = 'DECREASE';

  const chevronUp = <FontAwesomeIcon icon={faChevronUp} />;
  const chevronDown = <FontAwesomeIcon icon={faChevronDown} />;
  const resetSymbol = <FontAwesomeIcon icon={faUndoAlt} />;
  const playSymbol = <FontAwesomeIcon icon={faPlay} />;
  const pauseSymbol = <FontAwesomeIcon icon={faPause} />;

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

  const startTimer = useCallback((evt) => {
    evt.target.closest('.button').blur();

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

  const reset = useCallback((evt) => {
    evt.target.closest('.button').blur();

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
      <div className="timer__top">
        <BreakDisplay
          time={breakLength}
          onChange={changeBreak}
          modificator={{ INCREASE, DECREASE }}
          buttons={{ chevronUp, chevronDown }}
        />
        <SessionDisplay
          time={length.length}
          onChange={changeLength}
          modificator={{ INCREASE, DECREASE }}
          buttons={{ chevronUp, chevronDown }}
        />
      </div>
      <TimerDisplay time={length.timer} stage={stage} />
      <TimerButtons
        onStart={startTimer}
        onReset={reset}
        resetSymbol={resetSymbol}
        playSymbol={runningId ? pauseSymbol : playSymbol}
      />
    </div>
  );
}

export default App;
