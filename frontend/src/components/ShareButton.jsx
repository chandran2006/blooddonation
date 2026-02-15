const ShareButton = ({ title, text, url }) => {
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: title || 'Blood Donation System',
          text: text || 'Join us in saving lives through blood donation',
          url: url || window.location.href
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      // Fallback: Copy to clipboard
      navigator.clipboard.writeText(url || window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  return (
    <button className="btn btn-outline-info btn-sm" onClick={handleShare}>
      <i className="bi bi-share me-1"></i>
      Share
    </button>
  );
};

export default ShareButton;
