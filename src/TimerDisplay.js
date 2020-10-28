import './TimerDisplay.css';

export const TimerDisplay = ({ time }) => {
  return (
    <div className="timer__display">
      <label htmlFor="time-left" id="timer-label">
        Session
      </label>
      <input
        type="text"
        name="time-left"
        id="time-left"
        className="timer__time-left"
        value={ time / 60 }
        readOnly
      ></input>
    </div>
  );
};
