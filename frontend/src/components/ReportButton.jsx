import { useState } from 'react';
import ReportModal from './ReportModal';

const ReportButton = ({ userId, userName }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button
        className="btn btn-sm btn-outline-danger"
        onClick={() => setShowModal(true)}
        title="Report an issue"
      >
        <i className="bi bi-flag-fill"></i> Report Issue
      </button>
      
      {showModal && (
        <ReportModal
          show={showModal}
          onHide={() => setShowModal(false)}
          reportedUserId={userId}
          reportedUserName={userName}
        />
      )}
    </>
  );
};

export default ReportButton;
