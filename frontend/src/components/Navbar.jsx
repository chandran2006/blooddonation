import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { authService } from '../services/authService';
import LanguageSwitcher from './LanguageSwitcher';
import ThemeToggle from './ThemeToggle';

const Navbar = () => {
  const { t } = useTranslation();
  const email = authService.getEmail();
  const role = authService.getRole();

  const handleLogout = () => {
    authService.logout();
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-danger">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          <i className="bi bi-heart-pulse-fill me-2"></i>
          Blood Donation System
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto align-items-center">
            <li className="nav-item me-2">
              <LanguageSwitcher />
            </li>
            <li className="nav-item me-2">
              <ThemeToggle />
            </li>
            <li className="nav-item">
              <span className="nav-link">
                <i className="bi bi-person-circle me-1"></i>
                {email} ({role})
              </span>
            </li>
            <li className="nav-item">
              <button className="btn btn-outline-light btn-sm" onClick={handleLogout}>
                <i className="bi bi-box-arrow-right me-1"></i>
                {t('logout')}
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
