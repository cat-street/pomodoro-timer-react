import './TimerButtons.css';

export const TimerButtons = ({ onStart, onReset, resetSymbol, playSymbol }) => {

  return (
    <div className="timer__buttons">
      <button
        type="button"
        id="start_stop"
        className="button button_type_big"
        onClick={onStart}
      >
        {playSymbol}
      </button>
      <button
        type="button"
        id="reset"
        className="button button_type_big"
        onClick={onReset}
      >
        {resetSymbol}
      </button>
    </div>
  );
};
