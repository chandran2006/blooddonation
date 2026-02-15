import { useState, useEffect } from 'react';

const NotificationSystem = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // Simulate notifications
    const interval = setInterval(() => {
      const types = ['success', 'info', 'warning', 'danger'];
      const messages = [
        'New blood request in your area',
        'Emergency blood needed - O+',
        'Your donation saved a life!',
        'Profile updated successfully'
      ];
      
      if (Math.random() > 0.7) {
        const newNotif = {
          id: Date.now(),
          type: types[Math.floor(Math.random() * types.length)],
          message: messages[Math.floor(Math.random() * messages.length)]
        };
        
        setNotifications(prev => [...prev, newNotif]);
        
        setTimeout(() => {
          setNotifications(prev => prev.filter(n => n.id !== newNotif.id));
        }, 5000);
      }
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="position-fixed top-0 end-0 p-3" style={{ zIndex: 9999 }}>
      {notifications.map((notif) => (
        <div
          key={notif.id}
          className={`alert alert-${notif.type} alert-dismissible fade show`}
          role="alert"
          style={{ minWidth: '300px', animation: 'slideIn 0.3s ease' }}
        >
          <i className={`bi bi-${
            notif.type === 'success' ? 'check-circle' :
            notif.type === 'info' ? 'info-circle' :
            notif.type === 'warning' ? 'exclamation-triangle' :
            'x-circle'
          } me-2`}></i>
          {notif.message}
          <button
            type="button"
            className="btn-close"
            onClick={() => setNotifications(prev => prev.filter(n => n.id !== notif.id))}
          ></button>
        </div>
      ))}
      <style>{`
        @keyframes slideIn {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
};

export default NotificationSystem;
