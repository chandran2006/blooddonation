import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import Loading from '../components/Loading';
import { getMyReports } from '../services/reportService';

const MyReports = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      const response = await getMyReports();
      setReports(response.data);
    } catch (error) {
      console.error('Failed to fetch reports:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    const colors = { PENDING: 'warning', REVIEWED: 'info', RESOLVED: 'success', DISMISSED: 'secondary' };
    return colors[status] || 'secondary';
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
            <h2 className="mb-0">My Reports</h2>
            <button className="btn btn-secondary" onClick={() => navigate(-1)}>
              <i className="bi bi-arrow-left me-2"></i>Back
            </button>
          </div>

          <div className="card shadow-sm">
            <div className="card-header">
              <h5 className="mb-0"><i className="bi bi-flag-fill me-2"></i>Submitted Reports</h5>
            </div>
            <div className="card-body">
              {reports.length === 0 ? (
                <div className="text-center p-5">
                  <i className="bi bi-inbox" style={{ fontSize: '3rem', color: '#ccc' }}></i>
                  <p className="text-muted mt-3">You haven't submitted any reports yet.</p>
                </div>
              ) : (
                <div className="table-responsive">
                  <table className="table table-hover">
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Reported User</th>
                        <th>Reason</th>
                        <th>Description</th>
                        <th>Date</th>
                        <th>Status</th>
                        <th>Action Taken</th>
                      </tr>
                    </thead>
                    <tbody>
                      {reports.map(report => (
                        <tr key={report.id}>
                          <td>{report.id}</td>
                          <td><strong>{report.reportedUser.name}</strong></td>
                          <td>{report.reason}</td>
                          <td>
                            <small className="text-muted">
                              {report.description?.substring(0, 50)}
                              {report.description?.length > 50 ? '...' : ''}
                            </small>
                          </td>
                          <td>{new Date(report.reportDate).toLocaleDateString()}</td>
                          <td>
                            <span className={`badge bg-${getStatusColor(report.status)}`}>
                              {report.status}
                            </span>
                          </td>
                          <td>
                            {report.actionTaken ? (
                              <small className="text-success">{report.actionTaken}</small>
                            ) : (
                              <small className="text-muted">Pending review</small>
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

export default MyReports;
