import './TimerDisplay.css';

export const TimerDisplay = ({ time, stage }) => {
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
        {stage}
      </label>
      <div
        id="time-left"
        className="timer__time-left"
      >
        {formatTime()}
      </div>
    </div>
  );
};
