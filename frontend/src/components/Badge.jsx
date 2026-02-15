const Badge = ({ donations }) => {
  const getBadge = () => {
    if (donations >= 25) return { name: 'Hero', color: 'danger', icon: 'bi-trophy-fill' };
    if (donations >= 10) return { name: 'Gold', color: 'warning', icon: 'bi-star-fill' };
    if (donations >= 5) return { name: 'Silver', color: 'secondary', icon: 'bi-award-fill' };
    if (donations >= 1) return { name: 'Bronze', color: 'info', icon: 'bi-shield-fill' };
    return { name: 'New', color: 'light', icon: 'bi-person-badge' };
  };

  const badge = getBadge();

  return (
    <div className={`badge bg-${badge.color} fs-6 px-3 py-2`}>
      <i className={`${badge.icon} me-2`}></i>
      {badge.name} Donor
    </div>
  );
};

export default Badge;
