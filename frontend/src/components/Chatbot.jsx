import { useState } from 'react';
import { useTranslation } from 'react-i18next';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { type: 'bot', text: 'Hello! How can I help you today?' }
  ]);
  const [input, setInput] = useState('');
  const { t } = useTranslation();

  const responses = {
    'donate': 'To donate blood, you must be at least 18 years old, weigh at least 50kg, and be in good health. You can donate every 90 days.',
    'eligibility': 'You are eligible to donate if: 1) Age 18-65, 2) Weight >50kg, 3) Good health, 4) No recent illness, 5) 90 days since last donation.',
    'blood groups': 'Blood groups are: A+, A-, B+, B-, AB+, AB-, O+, O-. O- is universal donor, AB+ is universal recipient.',
    'emergency': 'For emergency blood requests, mark your request as EMERGENCY. It will be highlighted to all donors.',
    'help': 'I can help you with: blood donation eligibility, blood groups, emergency requests, donation process, and general queries.',
  };

  const handleSend = () => {
    if (!input.trim()) return;

    setMessages(prev => [...prev, { type: 'user', text: input }]);

    const lowerInput = input.toLowerCase();
    let response = "I'm here to help! Ask me about blood donation, eligibility, blood groups, or emergency requests.";

    for (const [key, value] of Object.entries(responses)) {
      if (lowerInput.includes(key)) {
        response = value;
        break;
      }
    }

    setTimeout(() => {
      setMessages(prev => [...prev, { type: 'bot', text: response }]);
    }, 500);

    setInput('');
  };

  return (
    <>
      {/* Chat Button */}
      <button
        className="btn btn-danger rounded-circle position-fixed"
        style={{
          bottom: '20px',
          right: '20px',
          width: '60px',
          height: '60px',
          zIndex: 1000,
          boxShadow: '0 4px 12px rgba(0,0,0,0.3)'
        }}
        onClick={() => setIsOpen(!isOpen)}
      >
        <i className={`bi ${isOpen ? 'bi-x-lg' : 'bi-chat-dots-fill'} fs-4`}></i>
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div
          className="card position-fixed shadow-lg"
          style={{
            bottom: '90px',
            right: '20px',
            width: '350px',
            height: '500px',
            zIndex: 1000,
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          <div className="card-header bg-danger text-white">
            <h6 className="mb-0">
              <i className="bi bi-robot me-2"></i>
              Blood Donation Assistant
            </h6>
          </div>
          
          <div className="card-body overflow-auto flex-grow-1" style={{ maxHeight: '380px' }}>
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`mb-2 ${msg.type === 'user' ? 'text-end' : ''}`}
              >
                <div
                  className={`d-inline-block p-2 rounded ${
                    msg.type === 'user'
                      ? 'bg-danger text-white'
                      : 'bg-light text-dark'
                  }`}
                  style={{ maxWidth: '80%' }}
                >
                  {msg.text}
                </div>
              </div>
            ))}
          </div>

          <div className="card-footer">
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                placeholder="Type your message..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              />
              <button className="btn btn-danger" onClick={handleSend}>
                <i className="bi bi-send-fill"></i>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;
