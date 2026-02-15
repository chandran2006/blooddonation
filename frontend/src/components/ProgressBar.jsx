const ProgressBar = ({ current, target, label }) => {
  const percentage = Math.min((current / target) * 100, 100);

  return (
    <div className="mb-3">
      <div className="d-flex justify-content-between mb-1">
        <small className="text-muted">{label}</small>
        <small className="text-muted">{current} / {target}</small>
      </div>
      <div className="progress" style={{ height: '20px' }}>
        <div
          className="progress-bar bg-danger progress-bar-striped progress-bar-animated"
          role="progressbar"
          style={{ width: `${percentage}%` }}
          aria-valuenow={current}
          aria-valuemin="0"
          aria-valuemax={target}
        >
          {percentage.toFixed(0)}%
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;
