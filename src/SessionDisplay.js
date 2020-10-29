export const SessionDisplay = ({ time, onChange, modificator, buttons }) => {
  const { INCREASE, DECREASE } = modificator;
  const { chevronUp, chevronDown } = buttons;

  return (
    <div className="timer__small-section">
      <p id="session-label" className="timer__small-label">
        Session Length
      </p>
      <div id="session-length" className="timer__small-display">
        <button
          type="button"
          id="session-decrement"
          className="button button_type_small"
          onClick={() => onChange(DECREASE)}
        >
          {chevronDown}
        </button>
        <span className="timer__small-value">{time / 60}</span>
        <button
          type="button"
          id="session-increment"
          className="button button_type_small"
          onClick={() => onChange(INCREASE)}
        >
          {chevronUp}
        </button>
      </div>
    </div>
  );
};
