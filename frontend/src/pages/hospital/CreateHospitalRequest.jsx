import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';
import { hospitalService } from '../../services/hospitalService';

const CreateHospitalRequest = () => {
  const [formData, setFormData] = useState({
    patientName: '',
    bloodGroup: '',
    hospitalName: '',
    city: '',
    urgencyLevel: 'NORMAL',
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      await hospitalService.createRequest(formData);
      setMessage('Request created successfully!');
      setTimeout(() => navigate('/hospital/dashboard'), 2000);
    } catch (error) {
      setMessage('Failed to create request. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="d-flex" style={{ minHeight: 'calc(100vh - 56px)' }}>
        <Sidebar />
        <div className="flex-grow-1 p-4" style={{ overflow: 'auto' }}>
          <h2 className="mb-4">Create Blood Request</h2>

          <div className="row justify-content-center">
            <div className="col-md-8">
              <div className="card">
                <div className="card-body">
                  {message && (
                    <div className={`alert ${message.includes('success') ? 'alert-success' : 'alert-danger'}`}>
                      {message}
                    </div>
                  )}
                  <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                      <label className="form-label">Patient Name *</label>
                      <input
                        type="text"
                        className="form-control"
                        name="patientName"
                        value={formData.patientName}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Blood Group *</label>
                      <select
                        className="form-select"
                        name="bloodGroup"
                        value={formData.bloodGroup}
                        onChange={handleChange}
                        required
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
                    <div className="mb-3">
                      <label className="form-label">Hospital Name *</label>
                      <input
                        type="text"
                        className="form-control"
                        name="hospitalName"
                        value={formData.hospitalName}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">City *</label>
                      <input
                        type="text"
                        className="form-control"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Urgency Level *</label>
                      <select
                        className="form-select"
                        name="urgencyLevel"
                        value={formData.urgencyLevel}
                        onChange={handleChange}
                        required
                      >
                        <option value="NORMAL">Normal</option>
                        <option value="EMERGENCY">Emergency</option>
                      </select>
                    </div>
                    <button type="submit" className="btn btn-danger" disabled={loading}>
                      {loading ? 'Creating...' : 'Create Request'}
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

export default CreateHospitalRequest;
