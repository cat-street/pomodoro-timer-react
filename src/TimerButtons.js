import './TimerButtons.css';

export const TimerButtons = ({ onStart, onReset }) => {
  return (
    <div className="timer__buttons">
      <button
        type="button"
        id="start-stop"
        className="button button_type_big"
        onClick={onStart}
      >
        &gt;
      </button>
      <button
        type="button"
        id="reset"
        className="button button_type_big"
        onClick={onReset}
      >
        @
      </button>
    </div>
  );
};
