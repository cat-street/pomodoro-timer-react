export const BreakDisplay = ({ time, onChange, modificator, buttons }) => {
  const { INCREASE, DECREASE } = modificator;
  const { chevronUp, chevronDown } = buttons;

  return (
    <div className="timer__small-section">
      <p id="break-label" className="timer__small-label">
        Break Length
      </p>
      <div id="break-length" className="timer__small-display">
        <button
          type="button"
          id="break-decrement"
          className="button button_type_small"
          onClick={() => onChange(DECREASE)}
        >
          {chevronDown}
        </button>
        <span className="timer__small-value">
          {time / 60}
        </span>
        <button
          type="button"
          id="break-increment"
          className="button button_type_small"
          onClick={() => onChange(INCREASE)}
        >
          {chevronUp}
        </button>
      </div>
    </div>
  );
};
