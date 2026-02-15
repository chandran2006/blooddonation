import { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';
import Loading from '../../components/Loading';
import { donorService } from '../../services/donorService';

const DonorProfile = () => {
  const [profile, setProfile] = useState(null);
  const [formData, setFormData] = useState({
    phone: '',
    city: '',
    bloodGroup: '',
    lastDonationDate: '',
    available: true,
  });
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const data = await donorService.getProfile();
      setProfile(data);
      setFormData({
        phone: data.phone || '',
        city: data.city || '',
        bloodGroup: data.bloodGroup || '',
        lastDonationDate: data.lastDonationDate || '',
        available: data.available,
      });
    } catch (error) {
      console.error('Error fetching profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormData({ ...formData, [e.target.name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdating(true);
    setMessage('');

    try {
      await donorService.updateProfile(formData);
      setMessage('Profile updated successfully!');
      fetchProfile();
    } catch (error) {
      setMessage('Failed to update profile.');
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="d-flex" style={{ minHeight: 'calc(100vh - 56px)' }}>
          <Sidebar />
          <div className="flex-grow-1">
            <Loading />
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="d-flex" style={{ minHeight: 'calc(100vh - 56px)' }}>
        <Sidebar />
        <div className="flex-grow-1 p-4" style={{ overflow: 'auto' }}>
          <h2 className="mb-4">My Profile</h2>

          <div className="row">
            <div className="col-md-4">
              <div className="card shadow-sm">
                <div className="card-body text-center py-5">
                  <div className="mb-4">
                    <i className="bi bi-person-circle" style={{ fontSize: '120px', color: '#dc3545' }}></i>
                  </div>
                  <h3 className="mb-2">{profile?.name}</h3>
                  <p className="text-muted mb-3">{profile?.email}</p>
                  <span className="badge bg-danger fs-4 px-4 py-2">{profile?.bloodGroup}</span>
                  <div className="mt-4">
                    <p className="mb-1"><i className="bi bi-telephone-fill me-2"></i>{profile?.phone || 'Not provided'}</p>
                    <p className="mb-1"><i className="bi bi-geo-alt-fill me-2"></i>{profile?.city || 'Not provided'}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-8">
              <div className="card shadow-sm">
                <div className="card-header">
                  <h5>Update Profile</h5>
                </div>
                <div className="card-body">
                  {message && (
                    <div className={`alert alert-dismissible fade show ${
                      message.includes('success') ? 'alert-success' : 'alert-danger'
                    }`} role="alert">
                      {message}
                      <button type="button" className="btn-close" onClick={() => setMessage('')}></button>
                    </div>
                  )}
                  <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                      <label className="form-label">Phone</label>
                      <input
                        type="tel"
                        className="form-control"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">City</label>
                      <input
                        type="text"
                        className="form-control"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Blood Group</label>
                      <select
                        className="form-select"
                        name="bloodGroup"
                        value={formData.bloodGroup}
                        onChange={handleChange}
                      >
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
                    <div className="mb-3">
                      <label className="form-label">Last Donation Date</label>
                      <input
                        type="date"
                        className="form-control"
                        name="lastDonationDate"
                        value={formData.lastDonationDate}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="mb-3 form-check">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        name="available"
                        checked={formData.available}
                        onChange={handleChange}
                      />
                      <label className="form-check-label">Available for donation</label>
                    </div>
                    <button type="submit" className="btn btn-danger" disabled={updating}>
                      {updating ? 'Updating...' : 'Update Profile'}
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DonorProfile;
