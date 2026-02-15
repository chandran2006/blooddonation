import { useState } from 'react';

const SearchFilter = ({ onSearch, onFilterChange }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [bloodGroup, setBloodGroup] = useState('');
  const [urgency, setUrgency] = useState('');

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch(value);
  };

  const handleBloodGroupChange = (e) => {
    const value = e.target.value;
    setBloodGroup(value);
    onFilterChange({ bloodGroup: value, urgency });
  };

  const handleUrgencyChange = (e) => {
    const value = e.target.value;
    setUrgency(value);
    onFilterChange({ bloodGroup, urgency: value });
  };

  const handleReset = () => {
    setSearchTerm('');
    setBloodGroup('');
    setUrgency('');
    onSearch('');
    onFilterChange({ bloodGroup: '', urgency: '' });
  };

  return (
    <div className="card shadow-sm mb-4">
      <div className="card-body">
        <div className="row g-3">
          <div className="col-md-4">
            <label className="form-label">Search</label>
            <input
              type="text"
              className="form-control"
              placeholder="Search by patient name or city..."
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
          <div className="col-md-3">
            <label className="form-label">Blood Group</label>
            <select className="form-select" value={bloodGroup} onChange={handleBloodGroupChange}>
              <option value="">All Blood Groups</option>
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
          <div className="col-md-3">
            <label className="form-label">Urgency</label>
            <select className="form-select" value={urgency} onChange={handleUrgencyChange}>
              <option value="">All Urgency Levels</option>
              <option value="NORMAL">Normal</option>
              <option value="EMERGENCY">Emergency</option>
            </select>
          </div>
          <div className="col-md-2">
            <label className="form-label">&nbsp;</label>
            <button className="btn btn-outline-secondary w-100" onClick={handleReset}>
              <i className="bi bi-arrow-clockwise me-1"></i>Reset
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchFilter;
