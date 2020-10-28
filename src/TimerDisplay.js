import './TimerDisplay.css';

export const TimerDisplay = ({ time }) => {
  const formatTime = () => {
    let minutes = Math.floor(time / 60).toString();
    let seconds = (time % 60).toString();

    const formatTime = (val) => {
      if (val.length === 1) {
        return '0' + val;
      } else {
        return val;
      }
    }

    minutes = formatTime(minutes);
    seconds = formatTime(seconds);

    return minutes + ':' + seconds;
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
