import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { authService } from '../../services/authService';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await authService.login(formData);
      localStorage.setItem('token', response.token);
      localStorage.setItem('email', response.email);
      localStorage.setItem('role', response.role);

      const roleRoutes = {
        ADMIN: '/admin/dashboard',
        DONOR: '/donor/dashboard',
        PATIENT: '/patient/dashboard',
        HOSPITAL: '/hospital/dashboard',
      };

      navigate(roleRoutes[response.role] || '/');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-fluid vh-100 p-0">
      <div className="row h-100 g-0">
        <div className="col-md-6 d-none d-md-flex bg-danger text-white align-items-center justify-content-center">
          <div className="text-center p-5">
            <i className="bi bi-heart-pulse-fill" style={{ fontSize: '120px' }}></i>
            <h1 className="mt-4 display-3 fw-bold">Blood Donation System</h1>
            <p className="lead fs-3 mt-3">Save Lives, Donate Blood</p>
            <p className="fs-5 mt-4">Every drop counts. Be a hero today.</p>
          </div>
        </div>
        <div className="col-md-6 d-flex align-items-center justify-content-center bg-light">
          <div className="card shadow-lg border-0" style={{ width: '450px', maxWidth: '90%' }}>
            <div className="card-body p-5">
              <h2 className="text-center mb-4">Login</h2>
              {error && <div className="alert alert-danger">{error}</div>}
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                </div>
                <button type="submit" className="btn btn-danger w-100" disabled={loading}>
                  {loading ? 'Logging in...' : 'Login'}
                </button>
              </form>
              <div className="text-center mt-3">
                <Link to="/signup">Don't have an account? Sign up</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
