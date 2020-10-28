import './SessionDisplay.css';

export const SessionDisplay = ({ time, onChange, modificator }) => {
  const { INCREASE, DECREASE } = modificator;

  return (
    <div className="timer__session-display">
      <label
        htmlFor="session-length"
        id="session-label"
        className="timer__session-label"
      >
        Session Length
      </label>
      <input
        type="number"
        name="session-length"
        id="session-length"
        className="timer__session-length"
        value={time / 60}
        readOnly
      />
      <button
        type="button"
        id="session-decrement"
        className="button button_type_small"
        onClick={() => onChange(DECREASE)}
      >
        v
      </button>
      <button
        type="button"
        id="session-increment"
        className="button button_type_small"
        onClick={() => onChange(INCREASE)}
      >
        ^
      </button>
    </div>
  );
};
