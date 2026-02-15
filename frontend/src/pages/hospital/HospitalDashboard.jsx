import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';
import Loading from '../../components/Loading';
import StatsCard from '../../components/StatsCard';
import EmptyState from '../../components/EmptyState';
import EmergencyBadge from '../../components/EmergencyBadge';
import { hospitalService } from '../../services/hospitalService';
import { formatDateTime, getStatusColor } from '../../utils/helpers';

const HospitalDashboard = () => {
  const [requests, setRequests] = useState([]);
  const [filteredRequests, setFilteredRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState('ALL');
  const [filterBloodGroup, setFilterBloodGroup] = useState('ALL');
  const navigate = useNavigate();

  useEffect(() => {
    fetchRequests();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [requests, filterStatus, filterBloodGroup]);

  const fetchRequests = async () => {
    try {
      const data = await hospitalService.getAllRequests();
      setRequests(data);
    } catch (error) {
      console.error('Error fetching requests:', error);
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = requests;
    
    if (filterStatus !== 'ALL') {
      filtered = filtered.filter(r => r.status === filterStatus);
    }
    
    if (filterBloodGroup !== 'ALL') {
      filtered = filtered.filter(r => r.bloodGroup === filterBloodGroup);
    }
    
    setFilteredRequests(filtered);
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

  const emergencyCount = requests.filter(r => r.urgencyLevel === 'EMERGENCY').length;
  
  // Blood demand analytics
  const bloodGroupDemand = requests.reduce((acc, req) => {
    acc[req.bloodGroup] = (acc[req.bloodGroup] || 0) + 1;
    return acc;
  }, {});

  return (
    <>
      <Navbar />
      <div className="d-flex" style={{ minHeight: 'calc(100vh - 56px)' }}>
        <Sidebar />
        <div className="flex-grow-1 p-4" style={{ overflow: 'auto' }}>
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2 className="mb-0">Hospital Dashboard</h2>
            <button className="btn btn-danger" onClick={() => navigate('/hospital/create-request')}>
              <i className="bi bi-plus-circle me-2"></i>Create Request
            </button>
          </div>

          {/* Statistics */}
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
              title="Emergency"
              value={emergencyCount}
              icon="bi-exclamation-triangle-fill"
              color="danger"
            />
            <StatsCard
              title="Completed"
              value={requests.filter(r => r.status === 'COMPLETED').length}
              icon="bi-check-circle-fill"
              color="success"
            />
          </div>

          {/* Blood Demand Analytics */}
          <div className="card shadow-sm mb-4">
            <div className="card-header">
              <h5 className="mb-0"><i className="bi bi-bar-chart me-2"></i>Blood Demand Analytics</h5>
            </div>
            <div className="card-body">
              <div className="row">
                {Object.entries(bloodGroupDemand)
                  .sort(([, a], [, b]) => b - a)
                  .map(([group, count]) => (
                    <div key={group} className="col-md-3 mb-3">
                      <div className="card bg-light">
                        <div className="card-body text-center">
                          <span className="badge bg-danger fs-5">{group}</span>
                          <h3 className="mt-2 mb-0">{count}</h3>
                          <small className="text-muted">requests</small>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>

          {/* Filters */}
          <div className="card shadow-sm mb-4">
            <div className="card-body">
              <div className="row g-3">
                <div className="col-md-4">
                  <label className="form-label">Filter by Status</label>
                  <select 
                    className="form-select"
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                  >
                    <option value="ALL">All Status</option>
                    <option value="PENDING">Pending</option>
                    <option value="ACCEPTED">Accepted</option>
                    <option value="COMPLETED">Completed</option>
                  </select>
                </div>
                <div className="col-md-4">
                  <label className="form-label">Filter by Blood Group</label>
                  <select 
                    className="form-select"
                    value={filterBloodGroup}
                    onChange={(e) => setFilterBloodGroup(e.target.value)}
                  >
                    <option value="ALL">All Blood Groups</option>
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
                <div className="col-md-4">
                  <label className="form-label">&nbsp;</label>
                  <button 
                    className="btn btn-outline-secondary w-100"
                    onClick={() => {
                      setFilterStatus('ALL');
                      setFilterBloodGroup('ALL');
                    }}
                  >
                    <i className="bi bi-arrow-clockwise me-1"></i>Reset Filters
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Requests Table */}
          <div className="card shadow-sm">
            <div className="card-header d-flex justify-content-between align-items-center">
              <h5 className="mb-0"><i className="bi bi-list-ul me-2"></i>All Blood Requests</h5>
              <span className="badge bg-primary">{filteredRequests.length} Results</span>
            </div>
            <div className="card-body">
              {filteredRequests.length === 0 ? (
                <EmptyState
                  icon="bi-inbox"
                  title="No Requests Found"
                  message="No requests match your current filters."
                />
              ) : (
                <div className="table-responsive">
                  <table className="table table-hover">
                    <thead>
                      <tr>
                        <th>Patient</th>
                        <th>Blood Group</th>
                        <th>Hospital</th>
                        <th>City</th>
                        <th>Urgency</th>
                        <th>Date</th>
                        <th>Status</th>
                        <th>Accepted By</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredRequests.map((req) => (
                        <tr 
                          key={req.id}
                          className={req.urgencyLevel === 'EMERGENCY' ? 'table-danger' : ''}
                        >
                          <td><strong>{req.patientName}</strong></td>
                          <td><span className="badge bg-danger">{req.bloodGroup}</span></td>
                          <td>{req.hospitalName}</td>
                          <td><i className="bi bi-geo-alt-fill me-1"></i>{req.city}</td>
                          <td>
                            {req.urgencyLevel === 'EMERGENCY' ? (
                              <EmergencyBadge />
                            ) : (
                              <span className="badge bg-warning">NORMAL</span>
                            )}
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
                                <strong>{req.acceptedByName}</strong>
                                <br />
                                <small className="text-muted">{req.acceptedByEmail}</small>
                              </div>
                            ) : (
                              <span className="text-muted">-</span>
                            )}
                          </td>
                          <td>
                            {req.status === 'PENDING' && (
                              <button 
                                className="btn btn-sm btn-success"
                                onClick={async () => {
                                  try {
                                    await hospitalService.updateRequestStatus(req.id, 'ACCEPTED');
                                    fetchRequests();
                                    alert('Request accepted successfully!');
                                  } catch (error) {
                                    alert('Failed to accept request');
                                  }
                                }}
                              >
                                <i className="bi bi-check-circle me-1"></i>Accept
                              </button>
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

export default HospitalDashboard;
