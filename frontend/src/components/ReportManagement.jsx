import { useState, useEffect } from 'react';
import { Card, Table, Badge, Button, Modal, Form } from 'react-bootstrap';
import { getAllReports, takeAction } from '../services/reportService';
import { useTranslation } from 'react-i18next';

const ReportManagement = () => {
  const { t } = useTranslation();
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showActionModal, setShowActionModal] = useState(false);
  const [selectedReport, setSelectedReport] = useState(null);
  const [actionData, setActionData] = useState({ status: '', actionTaken: '' });

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      const response = await getAllReports();
      setReports(response.data);
    } catch (error) {
      console.error('Failed to fetch reports:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAction = async () => {
    try {
      await takeAction(selectedReport.id, actionData);
      alert('Action taken successfully');
      setShowActionModal(false);
      fetchReports();
      setActionData({ status: '', actionTaken: '' });
    } catch (error) {
      alert('Failed to take action');
    }
  };

  const getStatusColor = (status) => {
    const colors = { PENDING: 'warning', REVIEWED: 'info', RESOLVED: 'success', DISMISSED: 'secondary' };
    return colors[status] || 'secondary';
  };

  if (loading) return <div className="text-center p-5">Loading...</div>;

  return (
    <>
      <Card>
        <Card.Header>
          <h4>{t('reportManagement') || 'Report Management'}</h4>
        </Card.Header>
        <Card.Body>
          <Table responsive hover>
            <thead>
              <tr>
                <th>ID</th>
                <th>{t('reporter') || 'Reporter'}</th>
                <th>{t('reportedUser') || 'Reported User'}</th>
                <th>{t('reason') || 'Reason'}</th>
                <th>{t('date') || 'Date'}</th>
                <th>{t('status') || 'Status'}</th>
                <th>{t('action') || 'Action'}</th>
              </tr>
            </thead>
            <tbody>
              {reports.map(report => (
                <tr key={report.id}>
                  <td>{report.id}</td>
                  <td>{report.reporter.name}</td>
                  <td>{report.reportedUser.name}</td>
                  <td>{report.reason}</td>
                  <td>{new Date(report.reportDate).toLocaleDateString()}</td>
                  <td><Badge bg={getStatusColor(report.status)}>{report.status}</Badge></td>
                  <td>
                    <Button 
                      size="sm" 
                      onClick={() => { setSelectedReport(report); setShowActionModal(true); }}
                    >
                      {t('takeAction') || 'Take Action'}
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>

      <Modal show={showActionModal} onHide={() => setShowActionModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>{t('takeAction') || 'Take Action'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedReport && (
            <>
              <p><strong>{t('reporter') || 'Reporter'}:</strong> {selectedReport.reporter.name}</p>
              <p><strong>{t('reportedUser') || 'Reported User'}:</strong> {selectedReport.reportedUser.name}</p>
              <p><strong>{t('reason') || 'Reason'}:</strong> {selectedReport.reason}</p>
              <p><strong>{t('description') || 'Description'}:</strong> {selectedReport.description}</p>
              <Form.Group className="mb-3">
                <Form.Label>{t('status') || 'Status'}</Form.Label>
                <Form.Select 
                  value={actionData.status}
                  onChange={(e) => setActionData({...actionData, status: e.target.value})}
                >
                  <option value="">Select Status</option>
                  <option value="REVIEWED">REVIEWED</option>
                  <option value="RESOLVED">RESOLVED</option>
                  <option value="DISMISSED">DISMISSED</option>
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>{t('actionTaken') || 'Action Taken'}</Form.Label>
                <Form.Control 
                  as="textarea" 
                  rows={3}
                  value={actionData.actionTaken}
                  onChange={(e) => setActionData({...actionData, actionTaken: e.target.value})}
                  placeholder="Describe action taken..."
                />
              </Form.Group>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowActionModal(false)}>{t('cancel') || 'Cancel'}</Button>
          <Button variant="primary" onClick={handleAction}>{t('submit') || 'Submit'}</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ReportManagement;
