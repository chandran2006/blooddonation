import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';
import Loading from '../../components/Loading';
import StatsCard from '../../components/StatsCard';
import EmptyState from '../../components/EmptyState';
import Badge from '../../components/Badge';
import EmergencyBadge from '../../components/EmergencyBadge';
import ReportButton from '../../components/ReportButton';
import { donorService } from '../../services/donorService';
import { checkDonationEligibility, getNextEligibleDate } from '../../utils/eligibility';
import { formatDateTime } from '../../utils/helpers';

const DonorDashboard = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [requests, setRequests] = useState([]);
  const [filteredRequests, setFilteredRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingAvailability, setUpdatingAvailability] = useState(false);
  const [filterBloodGroup, setFilterBloodGroup] = useState('ALL');

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    filterRequests();
  }, [requests, filterBloodGroup]);

  const fetchData = async () => {
    try {
      const [profileData, requestsData] = await Promise.all([
        donorService.getProfile(),
        donorService.getRequests(),
      ]);
      setProfile(profileData);
      setRequests(requestsData);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterRequests = () => {
    if (filterBloodGroup === 'ALL') {
      setFilteredRequests(requests);
    } else if (filterBloodGroup === 'MINE') {
      setFilteredRequests(requests.filter(r => r.bloodGroup === profile?.bloodGroup));
    } else {
      setFilteredRequests(requests.filter(r => r.bloodGroup === filterBloodGroup));
    }
  };

  const handleAvailabilityToggle = async () => {
    const eligibility = checkDonationEligibility(profile?.lastDonationDate);
    
    // Only block if trying to enable availability when not eligible
    if (!eligibility.eligible && !profile?.available) {
      alert(`You can donate again after ${eligibility.daysRemaining} days (${getNextEligibleDate(profile?.lastDonationDate)})`);
      return;
    }

    setUpdatingAvailability(true);
    try {
      const newAvailability = !profile?.available;
      await donorService.updateProfile({ available: newAvailability });
      setProfile({ ...profile, available: newAvailability });
    } catch (error) {
      console.error('Error updating availability:', error);
      alert('Failed to update availability. Please try again.');
    } finally {
      setUpdatingAvailability(false);
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

  const eligibility = checkDonationEligibility(profile?.lastDonationDate);
  const emergencyRequests = filteredRequests.filter(r => r.urgencyLevel === 'EMERGENCY');

  return (
    <>
      <Navbar />
      <div className="d-flex" style={{ minHeight: 'calc(100vh - 56px)' }}>
        <Sidebar />
        <div className="flex-grow-1 p-4" style={{ overflow: 'auto' }}>
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2 className="mb-0">Donor Dashboard</h2>
            <div className="d-flex gap-2">
              <ReportButton userId={1} userName="System" />
              <Badge donations={profile?.totalDonations || 0} />
            </div>
          </div>

          {/* Profile Card */}
          <div className="card shadow-sm mb-4">
            <div className="card-body">
              <div className="row align-items-center">
                <div className="col-md-3 text-center">
                  <i className="bi bi-person-circle" style={{ fontSize: '80px', color: '#dc3545' }}></i>
                  <h4 className="mt-2">{profile?.name}</h4>
                  <span className="badge bg-danger fs-5">{profile?.bloodGroup}</span>
                </div>
                <div className="col-md-6">
                  <h5>Profile Information</h5>
                  <p className="mb-1"><i className="bi bi-envelope me-2"></i>{profile?.email}</p>
                  <p className="mb-1"><i className="bi bi-telephone me-2"></i>{profile?.phone || 'Not provided'}</p>
                  <p className="mb-1"><i className="bi bi-geo-alt me-2"></i>{profile?.city || 'Not provided'}</p>
                  <p className="mb-1"><i className="bi bi-calendar me-2"></i>Last Donation: {profile?.lastDonationDate || 'Never'}</p>
                </div>
                <div className="col-md-3">
                  <div className="text-center">
                    <h6>Availability Status</h6>
                    <div className="form-check form-switch d-flex justify-content-center">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        role="switch"
                        style={{ width: '60px', height: '30px', cursor: 'pointer' }}
                        checked={profile?.available || false}
                        onChange={handleAvailabilityToggle}
                        disabled={updatingAvailability}
                      />
                    </div>
                    <span className={`badge bg-${profile?.available ? 'success' : 'secondary'} mt-2`}>
                      {profile?.available ? 'Available' : 'Not Available'}
                    </span>
                    {!eligibility.eligible && (
                      <div className="alert alert-warning mt-3 p-2">
                        <small>
                          <i className="bi bi-exclamation-triangle me-1"></i>
                          Eligible in {eligibility.daysRemaining} days
                        </small>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Statistics */}
          <div className="row mb-4">
            <StatsCard
              title="Blood Group"
              value={profile?.bloodGroup || 'N/A'}
              icon="bi-droplet-fill"
              color="danger"
            />
            <StatsCard
              title="Total Donations"
              value={profile?.totalDonations || 0}
              icon="bi-heart-fill"
              color="success"
              subtitle="lifetime donations"
            />
            <StatsCard
              title="Active Requests"
              value={filteredRequests.length}
              icon="bi-bell-fill"
              color="warning"
            />
            <StatsCard
              title="Emergency"
              value={emergencyRequests.length}
              icon="bi-exclamation-triangle-fill"
              color="danger"
            />
          </div>

          {/* Blood Requests */}
          <div className="card shadow-sm">
            <div className="card-header d-flex justify-content-between align-items-center">
              <h5 className="mb-0"><i className="bi bi-list-ul me-2"></i>Blood Requests</h5>
              <div>
                <select 
                  className="form-select form-select-sm"
                  value={filterBloodGroup}
                  onChange={(e) => setFilterBloodGroup(e.target.value)}
                >
                  <option value="ALL">All Blood Groups</option>
                  <option value="MINE">My Blood Group ({profile?.bloodGroup})</option>
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
            </div>
            <div className="card-body">
              {filteredRequests.length === 0 ? (
                <EmptyState
                  icon="bi-inbox"
                  title="No Blood Requests"
                  message="There are currently no blood requests matching your filter."
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
                          style={{ cursor: 'pointer' }}
                        >
                          <td><strong>{req.patientName}</strong></td>
                          <td>
                            <span className="badge bg-danger">{req.bloodGroup}</span>
                            {req.bloodGroup === profile?.bloodGroup && (
                              <span className="badge bg-success ms-1">Match</span>
                            )}
                          </td>
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
                            <span className="badge bg-info">{req.status}</span>
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
                                    await donorService.acceptRequest(req.id);
                                    fetchData();
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

export default DonorDashboard;
