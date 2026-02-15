import { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { createReport } from '../services/reportService';
import { useTranslation } from 'react-i18next';

const ReportModal = ({ show, onHide, reportedUserId, reportedUserName }) => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({ reason: '', description: '' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await createReport({ ...formData, reportedUserId });
      alert(t('reportSubmitted') || 'Report submitted successfully');
      onHide();
      setFormData({ reason: '', description: '' });
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to submit report');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>{t('reportUser') || 'Report User'}: {reportedUserName}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>{t('reason') || 'Reason'}</Form.Label>
            <Form.Select 
              value={formData.reason} 
              onChange={(e) => setFormData({...formData, reason: e.target.value})}
              required
            >
              <option value="">{t('selectReason') || 'Select reason'}</option>
              <option value="Inappropriate Behavior">Inappropriate Behavior</option>
              <option value="Fake Information">Fake Information</option>
              <option value="No Response">No Response</option>
              <option value="Harassment">Harassment</option>
              <option value="Other">Other</option>
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>{t('description') || 'Description'}</Form.Label>
            <Form.Control 
              as="textarea" 
              rows={3}
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              placeholder={t('describeIssue') || 'Describe the issue...'}
              required
            />
          </Form.Group>
          <div className="d-flex gap-2">
            <Button variant="danger" type="submit" disabled={loading}>
              {loading ? t('submitting') || 'Submitting...' : t('submit') || 'Submit Report'}
            </Button>
            <Button variant="secondary" onClick={onHide}>{t('cancel') || 'Cancel'}</Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default ReportModal;
