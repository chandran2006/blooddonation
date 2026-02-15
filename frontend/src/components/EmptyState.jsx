const EmptyState = ({ icon = 'bi-inbox', title, message, actionText, onAction }) => {
  return (
    <div className="text-center py-5">
      <i className={`bi ${icon} text-muted`} style={{ fontSize: '4rem' }}></i>
      <h4 className="mt-3 text-muted">{title}</h4>
      <p className="text-muted">{message}</p>
      {actionText && onAction && (
        <button className="btn btn-danger mt-3" onClick={onAction}>
          {actionText}
        </button>
      )}
    </div>
  );
};

export default EmptyState;
