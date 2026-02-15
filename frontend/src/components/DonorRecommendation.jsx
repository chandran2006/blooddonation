import { useState, useEffect } from 'react';
import { donorRecommendationService } from '../services/donorRecommendationService';
import ReportModal from './ReportModal';

const DonorRecommendation = ({ requestId, onClose }) => {
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [contacting, setContacting] = useState(null);
  const [showReportModal, setShowReportModal] = useState(false);
  const [reportTarget, setReportTarget] = useState(null);

  useEffect(() => {
    fetchRecommendations();
  }, [requestId]);

  const fetchRecommendations = async () => {
    try {
      const data = await donorRecommendationService.getRecommendations(requestId);
      setRecommendations(data);
    } catch (error) {
      console.error('Error fetching recommendations:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleContact = async (donorId) => {
    if (!window.confirm('Contact this donor? They will be marked as unavailable after contact.')) {
      return;
    }

    setContacting(donorId);
    try {
      await donorRecommendationService.contactDonor(donorId, requestId, 'Blood donation request');
      alert('Donor contacted successfully! They have been marked as unavailable.');
      fetchRecommendations();
    } catch (error) {
      alert('Failed to contact donor. Please try again.');
    } finally {
      setContacting(null);
    }
  };

  if (loading) {
    return (
      <div className="text-center p-4">
        <div className="spinner-border text-danger" role="status"></div>
        <p className="mt-2">Finding best donors...</p>
      </div>
    );
  }

  return (
    <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog modal-lg modal-dialog-scrollable">
        <div className="modal-content">
          <div className="modal-header bg-danger text-white">
            <h5 className="modal-title">
              <i className="bi bi-robot me-2"></i>
              AI Donor Recommendations
            </h5>
            <button type="button" className="btn-close btn-close-white" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            {recommendations.length === 0 ? (
              <div className="alert alert-info">
                <i className="bi bi-info-circle me-2"></i>
                No matching donors found at this time.
              </div>
            ) : (
              <>
                <div className="alert alert-success">
                  <i className="bi bi-check-circle me-2"></i>
                  Found {recommendations.length} recommended donors based on AI scoring
                </div>
                {recommendations.map((donor, index) => (
                  <div key={donor.donorId} className="card mb-3 shadow-sm">
                    <div className="card-body">
                      <div className="row align-items-center">
                        <div className="col-md-1 text-center">
                          <div className="badge bg-danger rounded-circle" style={{ width: '40px', height: '40px', lineHeight: '40px', fontSize: '18px' }}>
                            #{index + 1}
                          </div>
                        </div>
                        <div className="col-md-7">
                          <h5 className="mb-1">
                            {donor.name}
                            {donor.eligibilityStatus === 'Eligible' && (
                              <span className="badge bg-success ms-2">Eligible</span>
                            )}
                            {donor.eligibilityStatus === 'Not Eligible' && (
                              <span className="badge bg-warning ms-2">
                                Not Eligible ({donor.daysUntilEligible} days)
                              </span>
                            )}
                          </h5>
                          <div className="text-muted small">
                            <i className="bi bi-droplet-fill text-danger me-1"></i>
                            <strong>{donor.bloodGroup}</strong>
                            <span className="mx-2">|</span>
                            <i className="bi bi-geo-alt-fill me-1"></i>
                            {donor.city}
                            <span className="mx-2">|</span>
                            <i className="bi bi-heart-fill me-1"></i>
                            {donor.totalDonations} donations
                          </div>
                          <div className="mt-2">
                            <span className={`badge ${donor.available ? 'bg-success' : 'bg-secondary'}`}>
                              {donor.available ? 'Available' : 'Not Available'}
                            </span>
                          </div>
                        </div>
                        <div className="col-md-2 text-center">
                          <div className="mb-2">
                            <small className="text-muted">Match Score</small>
                            <h3 className="mb-0 text-danger">{donor.matchScore}</h3>
                          </div>
                        </div>
                        <div className="col-md-2">
                          {donor.available && donor.eligibilityStatus === 'Eligible' ? (
                            <>
                              <button
                                className="btn btn-danger w-100 mb-2"
                                onClick={() => handleContact(donor.donorId)}
                                disabled={contacting === donor.donorId}
                              >
                                {contacting === donor.donorId ? (
                                  <>
                                    <span className="spinner-border spinner-border-sm me-1"></span>
                                    Contacting...
                                  </>
                                ) : (
                                  <>
                                    <i className="bi bi-telephone-fill me-1"></i>
                                    Contact
                                  </>
                                )}
                              </button>
                              <button
                                className="btn btn-outline-danger btn-sm w-100"
                                onClick={() => { setReportTarget({ id: donor.donorId, name: donor.name }); setShowReportModal(true); }}
                              >
                                <i className="bi bi-flag-fill"></i> Report
                              </button>
                            </>
                          ) : (
                            <button className="btn btn-secondary w-100" disabled>
                              Unavailable
                            </button>
                          )}
                        </div>
                      </div>
                      {donor.phone && (
                        <div className="mt-2 pt-2 border-top">
                          <small className="text-muted">
                            <i className="bi bi-telephone me-1"></i>
                            Contact: {donor.phone}
                          </small>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Close
            </button>
          </div>
        </div>
      </div>
      {showReportModal && (
        <ReportModal 
          show={showReportModal}
          onHide={() => { setShowReportModal(false); setReportTarget(null); }}
          reportedUserId={reportTarget?.id}
          reportedUserName={reportTarget?.name}
        />
      )}
    </div>
  );
};

export default DonorRecommendation;
