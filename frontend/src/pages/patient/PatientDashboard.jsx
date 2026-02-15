import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';
import Loading from '../../components/Loading';
import StatsCard from '../../components/StatsCard';
import EmptyState from '../../components/EmptyState';
import { patientService } from '../../services/patientService';
import { formatDateTime, getStatusColor, getUrgencyColor } from '../../utils/helpers';

const PatientDashboard = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const data = await patientService.getMyRequests();
      setRequests(data);
    } catch (error) {
      console.error('Error fetching requests:', error);
    } finally {
      setLoading(false);
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
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2 className="mb-0">Patient Dashboard</h2>
            <button className="btn btn-danger" onClick={() => navigate('/patient/create-request')}>
              <i className="bi bi-plus-circle me-2"></i>Create Request
            </button>
          </div>

          <div className="row mb-4">
            <StatsCard
              title="Total Requests"
              value={requests.length}
              icon="bi-clipboard-check"
              color="primary"
            />
            <StatsCard
              title="Pending"
              value={requests.filter(r => r.status === 'PENDING').length}
              icon="bi-clock-history"
              color="warning"
            />
            <StatsCard
              title="Accepted"
              value={requests.filter(r => r.status === 'ACCEPTED').length}
              icon="bi-check-circle"
              color="info"
            />
            <StatsCard
              title="Completed"
              value={requests.filter(r => r.status === 'COMPLETED').length}
              icon="bi-check-all"
              color="success"
            />
          </div>

          <div className="card shadow-sm">
            <div className="card-header d-flex justify-content-between align-items-center">
              <h5 className="mb-0"><i className="bi bi-list-ul me-2"></i>My Blood Requests</h5>
              <span className="badge bg-primary">{requests.length} Total</span>
            </div>
            <div className="card-body">
              {requests.length === 0 ? (
                <EmptyState
                  icon="bi-clipboard-x"
                  title="No Requests Yet"
                  message="You haven't created any blood requests. Create your first request now!"
                  actionText="Create Request"
                  onAction={() => navigate('/patient/create-request')}
                />
              ) : (
                <div className="table-responsive">
                  <table className="table table-hover">
                    <thead>
                      <tr>
                        <th>Patient Name</th>
                        <th>Blood Group</th>
                        <th>Hospital</th>
                        <th>City</th>
                        <th>Urgency</th>
                        <th>Date</th>
                        <th>Status</th>
                        <th>Accepted By</th>
                      </tr>
                    </thead>
                    <tbody>
                      {requests.map((req) => (
                        <tr key={req.id}>
                          <td><strong>{req.patientName}</strong></td>
                          <td><span className="badge bg-danger">{req.bloodGroup}</span></td>
                          <td>{req.hospitalName}</td>
                          <td><i className="bi bi-geo-alt-fill me-1"></i>{req.city}</td>
                          <td>
                            <span className={`badge bg-${getUrgencyColor(req.urgencyLevel)}`}>
                              {req.urgencyLevel}
                            </span>
                          </td>
                          <td>{formatDateTime(req.requestDate)}</td>
                          <td>
                            <span className={`badge bg-${getStatusColor(req.status)}`}>
                              {req.status}
                            </span>
                          </td>
                          <td>
                            {req.acceptedByName ? (
                              <div>
                                <strong className="text-success">{req.acceptedByName}</strong>
                                <br />
                                <small className="text-muted">{req.acceptedByEmail}</small>
                              </div>
                            ) : (
                              <span className="text-muted">Waiting...</span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PatientDashboard;
