import './BreakDisplay.css';

export const BreakDisplay = ({ time, onChange, modificator }) => {
  const {INCREASE, DECREASE} = modificator;

  return (
    <div className="timer__break-display">
      <label htmlFor="break-length" id="break-label" className="timer__break-label">
        Break Length
      </label>
      <input
        type="number"
        name="break-length"
        id="break-length"
        className="timer__break-length"
        min="1"
        max="60"
        value={time / 60}
        readOnly
      />
      <button
        type="button"
        id="break-decrement"
        className="button button_type_small"
        onClick={() => onChange(DECREASE)}
      >
        v
      </button>
      <button
        type="button"
        id="break-increment"
        className="button button_type_small"
        onClick={() => onChange(INCREASE)}
      >
        ^
      </button>
    </div>
  );
};
