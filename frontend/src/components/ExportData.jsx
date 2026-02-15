const ExportData = ({ data, filename = 'data', type = 'csv' }) => {
  const exportToCSV = () => {
    if (!data || data.length === 0) return;

    const headers = Object.keys(data[0]).join(',');
    const rows = data.map(row => Object.values(row).join(',')).join('\n');
    const csv = `${headers}\n${rows}`;

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${filename}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const exportToJSON = () => {
    if (!data || data.length === 0) return;

    const json = JSON.stringify(data, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${filename}.json`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const handleExport = () => {
    if (type === 'csv') {
      exportToCSV();
    } else {
      exportToJSON();
    }
  };

  return (
    <button className="btn btn-outline-success btn-sm" onClick={handleExport}>
      <i className="bi bi-download me-1"></i>
      Export {type.toUpperCase()}
    </button>
  );
};

export default ExportData;
