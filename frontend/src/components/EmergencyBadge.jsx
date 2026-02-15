const EmergencyBadge = () => {
  return (
    <span className="badge bg-danger position-relative" style={{ animation: 'pulse 1.5s infinite' }}>
      <i className="bi bi-exclamation-triangle-fill me-1"></i>
      EMERGENCY
      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
      `}</style>
    </span>
  );
};

export default EmergencyBadge;
