import './TimerDisplay.css';

export const TimerDisplay = ({ time }) => {
  const formatTime = () => {
    let seconds = (time % 60).toString();
    if (seconds.length === 1) {
      seconds = '0' + seconds;
    }
    return (Math.floor(time / 60)) + ':' + seconds;
  }

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
        value={formatTime()}
        readOnly
      ></input>
    </div>
  );
};
