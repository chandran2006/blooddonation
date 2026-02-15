import axios from 'axios';

const API_URL = 'http://localhost:8080/api/reports';

const getAuthHeader = () => ({
  headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
});

export const createReport = (reportData) => 
  axios.post(API_URL, reportData, getAuthHeader());

export const getAllReports = () => 
  axios.get(API_URL, getAuthHeader());

export const getReportsByStatus = (status) => 
  axios.get(`${API_URL}/status/${status}`, getAuthHeader());

export const takeAction = (reportId, actionData) => 
  axios.put(`${API_URL}/${reportId}/action`, actionData, getAuthHeader());
