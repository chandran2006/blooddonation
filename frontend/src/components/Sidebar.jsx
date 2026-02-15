import { Link, useLocation } from 'react-router-dom';
import { authService } from '../services/authService';

const Sidebar = () => {
  const location = useLocation();
  const role = authService.getRole();

  const getMenuItems = () => {
    switch (role) {
      case 'DONOR':
        return [
          { path: '/donor/dashboard', icon: 'bi-speedometer2', label: 'Dashboard' },
          { path: '/donor/profile', icon: 'bi-person', label: 'Profile' },
        ];
      case 'PATIENT':
        return [
          { path: '/patient/dashboard', icon: 'bi-speedometer2', label: 'Dashboard' },
          { path: '/patient/create-request', icon: 'bi-plus-circle', label: 'Create Request' },
        ];
      case 'HOSPITAL':
        return [
          { path: '/hospital/dashboard', icon: 'bi-speedometer2', label: 'Dashboard' },
          { path: '/hospital/create-request', icon: 'bi-plus-circle', label: 'Create Request' },
        ];
      case 'ADMIN':
        return [
          { path: '/admin/dashboard', icon: 'bi-speedometer2', label: 'Dashboard' },
          { path: '/admin/users', icon: 'bi-people', label: 'Manage Users' },
        ];
      default:
        return [];
    }
  };

  return (
    <div className="bg-light border-end" style={{ width: '250px', minHeight: '100%' }}>
      <div className="list-group list-group-flush">
        {getMenuItems().map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`list-group-item list-group-item-action ${
              location.pathname === item.path ? 'active' : ''
            }`}
          >
            <i className={`bi ${item.icon} me-2`}></i>
            {item.label}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
