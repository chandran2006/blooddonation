import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { authService } from '../../services/authService';

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    city: '',
    role: 'DONOR',
    bloodGroup: '',
    hospitalName: '',
    licenseNumber: '',
    adminSecretKey: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    // Validate admin secret key
    if (formData.role === 'ADMIN' && formData.adminSecretKey !== 'RPHM') {
      setError('Invalid admin secret key. Please contact administrator.');
      return;
    }
    
    setLoading(true);

    try {
      const response = await authService.register(formData);
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
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-vh-100 bg-light">
      <nav className="navbar navbar-dark bg-danger">
        <div className="container">
          <span className="navbar-brand mb-0 h1">
            <i className="bi bi-heart-pulse-fill me-2"></i>
            Blood Donation System
          </span>
        </div>
      </nav>
      <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card shadow-lg">
            <div className="card-body p-5">
              <h2 className="text-center mb-4">Sign Up</h2>
              {error && <div className="alert alert-danger">{error}</div>}
              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Name *</label>
                    <input
                      type="text"
                      className="form-control"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Email *</label>
                    <input
                      type="email"
                      className="form-control"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Password *</label>
                    <input
                      type="password"
                      className="form-control"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Phone</label>
                    <input
                      type="tel"
                      className="form-control"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label">City</label>
                    <input
                      type="text"
                      className="form-control"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Role *</label>
                    <select
                      className="form-select"
                      name="role"
                      value={formData.role}
                      onChange={handleChange}
                      required
                    >
                      <option value="DONOR">Donor</option>
                      <option value="PATIENT">Patient</option>
                      <option value="HOSPITAL">Hospital</option>
                      <option value="ADMIN">Admin</option>
                    </select>
                  </div>
                </div>

                {formData.role === 'ADMIN' && (
                  <div className="mb-3">
                    <label className="form-label">Admin Secret Key *</label>
                    <input
                      type="password"
                      className="form-control"
                      name="adminSecretKey"
                      value={formData.adminSecretKey}
                      onChange={handleChange}
                      placeholder="Enter admin secret key"
                      required
                    />
                    <small className="text-muted">Contact administrator for the secret key</small>
                  </div>
                )}

                {formData.role === 'DONOR' && (
                  <div className="mb-3">
                    <label className="form-label">Blood Group</label>
                    <select
                      className="form-select"
                      name="bloodGroup"
                      value={formData.bloodGroup}
                      onChange={handleChange}
                    >
                      <option value="">Select Blood Group</option>
                      <option value="A+">A+</option>
                      <option value="A-">A-</option>
                      <option value="B+">B+</option>
                      <option value="B-">B-</option>
                      <option value="AB+">AB+</option>
                      <option value="AB-">AB-</option>
                      <option value="O+">O+</option>
                      <option value="O-">O-</option>
                    </select>
                  </div>
                )}

                {formData.role === 'HOSPITAL' && (
                  <>
                    <div className="mb-3">
                      <label className="form-label">Hospital Name</label>
                      <input
                        type="text"
                        className="form-control"
                        name="hospitalName"
                        value={formData.hospitalName}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">License Number</label>
                      <input
                        type="text"
                        className="form-control"
                        name="licenseNumber"
                        value={formData.licenseNumber}
                        onChange={handleChange}
                      />
                    </div>
                  </>
                )}

                <button type="submit" className="btn btn-danger w-100" disabled={loading}>
                  {loading ? 'Signing up...' : 'Sign Up'}
                </button>
              </form>
              <div className="text-center mt-3">
                <Link to="/login">Already have an account? Login</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Signup;
