const StatsCard = ({ title, value, icon, color = 'primary', subtitle }) => {
  return (
    <div className="col-md-3 mb-3">
      <div className={`card text-white bg-${color} h-100`}>
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h6 className="card-title text-uppercase mb-1" style={{ fontSize: '0.85rem' }}>
                {title}
              </h6>
              <h2 className="mb-0 fw-bold">{value}</h2>
              {subtitle && <small className="opacity-75">{subtitle}</small>}
            </div>
            {icon && (
              <div>
                <i className={`bi ${icon}`} style={{ fontSize: '2.5rem', opacity: 0.5 }}></i>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsCard;
