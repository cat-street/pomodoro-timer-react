import './TimerButtons.css';

export const TimerButtons = ({ onStart }) => {
  return (
    <div className="timer__buttons">
      <button type="button" id="start-stop" className="button button_type_big" onClick={onStart}>
        &gt;
      </button>
      <button type="button" id="reset" className="button button_type_big">
        @
      </button>
    </div>
  );
};
