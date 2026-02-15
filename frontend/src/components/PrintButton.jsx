const PrintButton = ({ contentId }) => {
  const handlePrint = () => {
    const content = document.getElementById(contentId);
    if (!content) return;

    const printWindow = window.open('', '', 'height=600,width=800');
    printWindow.document.write('<html><head><title>Print</title>');
    printWindow.document.write('<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css">');
    printWindow.document.write('</head><body>');
    printWindow.document.write(content.innerHTML);
    printWindow.document.write('</body></html>');
    printWindow.document.close();
    printWindow.print();
  };

  return (
    <button className="btn btn-outline-primary btn-sm" onClick={handlePrint}>
      <i className="bi bi-printer me-1"></i>
      Print
    </button>
  );
};

export default PrintButton;
