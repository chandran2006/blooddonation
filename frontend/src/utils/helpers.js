export const formatDate = (dateString) => {
  if (!dateString) return 'N/A';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric' 
  });
};

export const formatDateTime = (dateString) => {
  if (!dateString) return 'N/A';
  const date = new Date(dateString);
  return date.toLocaleString('en-US', { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

export const getStatusColor = (status) => {
  const colors = {
    PENDING: 'warning',
    ACCEPTED: 'info',
    COMPLETED: 'success',
  };
  return colors[status] || 'secondary';
};

export const getUrgencyColor = (urgency) => {
  return urgency === 'EMERGENCY' ? 'danger' : 'warning';
};

export const getRoleColor = (role) => {
  const colors = {
    ADMIN: 'secondary',
    DONOR: 'danger',
    PATIENT: 'info',
    HOSPITAL: 'success',
  };
  return colors[role] || 'primary';
};

export const filterRequests = (requests, filters) => {
  return requests.filter(req => {
    const matchesSearch = !filters.search || 
      req.patientName.toLowerCase().includes(filters.search.toLowerCase()) ||
      req.city.toLowerCase().includes(filters.search.toLowerCase());
    
    const matchesBloodGroup = !filters.bloodGroup || req.bloodGroup === filters.bloodGroup;
    const matchesUrgency = !filters.urgency || req.urgencyLevel === filters.urgency;
    
    return matchesSearch && matchesBloodGroup && matchesUrgency;
  });
};
