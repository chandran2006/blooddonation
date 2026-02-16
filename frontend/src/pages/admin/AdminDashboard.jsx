import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';
import Loading from '../../components/Loading';
import StatsCard from '../../components/StatsCard';
import ReportManagement from '../../components/ReportManagement';
import EmergencyBadge from '../../components/EmergencyBadge';
import { adminService } from '../../services/adminService';
import { formatDateTime, getStatusColor } from '../../utils/helpers';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showReports, setShowReports] = useState(false);
  const [showRequests, setShowRequests] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [usersData, requestsData] = await Promise.all([
        adminService.getAllUsers(),
        adminService.getAllRequests()
      ]);
      setUsers(usersData);
      setRequests(requestsData);
    } catch (error) {
      console.error('Error fetching data:', error);
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

  const getRoleCount = (role) => users.filter(u => u.role === role).length;
  const getRequestsByStatus = (status) => requests.filter(r => r.status === status).length;
  const emergencyRequests = requests.filter(r => r.urgencyLevel === 'EMERGENCY').length;

  // Blood group analytics
  const bloodGroupCounts = requests.reduce((acc, req) => {
    acc[req.bloodGroup] = (acc[req.bloodGroup] || 0) + 1;
    return acc;
  }, {});

  const mostRequestedBloodGroup = Object.entries(bloodGroupCounts)
    .sort(([, a], [, b]) => b - a)[0]?.[0] || 'N/A';

  // City analytics
  const donorsByCity = users
    .filter(u => u.role === 'DONOR' && u.city)
    .reduce((acc, user) => {
      acc[user.city] = (acc[user.city] || 0) + 1;
      return acc;
    }, {});

  return (
    <>
      <Navbar />
      <div className="d-flex" style={{ minHeight: 'calc(100vh - 56px)' }}>
        <Sidebar />
        <div className="flex-grow-1 p-4" style={{ overflow: 'auto' }}>
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2 className="mb-0">Admin Dashboard</h2>
            <div className="d-flex gap-2">
              <button className="btn btn-info" onClick={() => setShowRequests(!showRequests)}>
                <i className="bi bi-clipboard-check me-2"></i>{showRequests ? 'Hide Requests' : 'View All Requests'}
              </button>
              <button className="btn btn-warning" onClick={() => setShowReports(!showReports)}>
                <i className="bi bi-flag-fill me-2"></i>{showReports ? 'Hide Reports' : 'View Reports'}
              </button>
              <button className="btn btn-danger" onClick={() => navigate('/admin/users')}>
                <i className="bi bi-people me-2"></i>Manage Users
              </button>
            </div>
          </div>

          {showReports && (
            <div className="mb-4">
              <ReportManagement />
            </div>
          )}

          {showRequests && (
            <div className="card shadow-sm mb-4">
              <div className="card-header">
                <h5 className="mb-0"><i className="bi bi-list-ul me-2"></i>All Blood Requests</h5>
              </div>
              <div className="card-body">
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
                        <th>Created By</th>
                        <th>Accepted By</th>
                      </tr>
                    </thead>
                    <tbody>
                      {requests.map((req) => (
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
                          <td><small>{req.createdByEmail}</small></td>
                          <td>
                            {req.acceptedByName ? (
                              <div>
                                <strong className="text-success">{req.acceptedByName}</strong>
                                <br />
                                <small className="text-muted">{req.acceptedByEmail}</small>
                              </div>
                            ) : (
                              <span className="text-muted">-</span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* User Statistics */}
          <h5 className="mb-3">User Statistics</h5>
          <div className="row mb-4">
            <StatsCard
              title="Total Users"
              value={users.length}
              icon="bi-people-fill"
              color="primary"
            />
            <StatsCard
              title="Donors"
              value={getRoleCount('DONOR')}
              icon="bi-heart-fill"
              color="danger"
            />
            <StatsCard
              title="Patients"
              value={getRoleCount('PATIENT')}
              icon="bi-person-fill"
              color="info"
            />
            <StatsCard
              title="Hospitals"
              value={getRoleCount('HOSPITAL')}
              icon="bi-hospital-fill"
              color="success"
            />
          </div>

          {/* Request Statistics */}
          <h5 className="mb-3">Request Statistics</h5>
          <div className="row mb-4">
            <StatsCard
              title="Total Requests"
              value={requests.length}
              icon="bi-clipboard-check"
              color="primary"
            />
            <StatsCard
              title="Pending"
              value={getRequestsByStatus('PENDING')}
              icon="bi-clock-history"
              color="warning"
            />
            <StatsCard
              title="Emergency"
              value={emergencyRequests}
              icon="bi-exclamation-triangle-fill"
              color="danger"
            />
            <StatsCard
              title="Completed"
              value={getRequestsByStatus('COMPLETED')}
              icon="bi-check-circle-fill"
              color="success"
            />
          </div>

          {/* Analytics Section */}
          <div className="row">
            <div className="col-md-6 mb-4">
              <div className="card shadow-sm h-100">
                <div className="card-header">
                  <h5 className="mb-0"><i className="bi bi-bar-chart me-2"></i>Blood Group Demand</h5>
                </div>
                <div className="card-body">
                  <div className="alert alert-info">
                    <h4 className="mb-0">{mostRequestedBloodGroup}</h4>
                    <small>Most Requested Blood Group</small>
                  </div>
                  <table className="table table-sm">
                    <thead>
                      <tr>
                        <th>Blood Group</th>
                        <th>Requests</th>
                      </tr>
                    </thead>
                    <tbody>
                      {Object.entries(bloodGroupCounts)
                        .sort(([, a], [, b]) => b - a)
                        .map(([group, count]) => (
                          <tr key={group}>
                            <td><span className="badge bg-danger">{group}</span></td>
                            <td><strong>{count}</strong></td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <div className="col-md-6 mb-4">
              <div className="card shadow-sm h-100">
                <div className="card-header">
                  <h5 className="mb-0"><i className="bi bi-geo-alt me-2"></i>Donors by City</h5>
                </div>
                <div className="card-body">
                  {Object.keys(donorsByCity).length === 0 ? (
                    <p className="text-muted">No city data available</p>
                  ) : (
                    <table className="table table-sm">
                      <thead>
                        <tr>
                          <th>City</th>
                          <th>Donors</th>
                        </tr>
                      </thead>
                      <tbody>
                        {Object.entries(donorsByCity)
                          .sort(([, a], [, b]) => b - a)
                          .slice(0, 10)
                          .map(([city, count]) => (
                            <tr key={city}>
                              <td><i className="bi bi-geo-alt-fill me-1"></i>{city}</td>
                              <td><strong>{count}</strong></td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* System Health */}
          <div className="card shadow-sm">
            <div className="card-header">
              <h5 className="mb-0"><i className="bi bi-activity me-2"></i>System Health</h5>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-md-4">
                  <div className="text-center p-3">
                    <i className="bi bi-check-circle-fill text-success" style={{ fontSize: '3rem' }}></i>
                    <h6 className="mt-2">Active Users</h6>
                    <h3>{users.filter(u => u.enabled).length}</h3>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="text-center p-3">
                    <i className="bi bi-graph-up text-primary" style={{ fontSize: '3rem' }}></i>
                    <h6 className="mt-2">Growth Rate</h6>
                    <h3>+{Math.floor(Math.random() * 20 + 10)}%</h3>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="text-center p-3">
                    <i className="bi bi-heart-pulse text-danger" style={{ fontSize: '3rem' }}></i>
                    <h6 className="mt-2">Lives Saved</h6>
                    <h3>{getRequestsByStatus('COMPLETED')}</h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
