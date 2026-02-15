import { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { type: 'bot', text: 'Hello! I\'m your Blood Donation Assistant. How can I help you today?' }
  ]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const { t } = useTranslation();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const knowledgeBase = {
    greetings: ['hello', 'hi', 'hey', 'good morning', 'good afternoon', 'good evening'],
    eligibility: ['eligible', 'eligibility', 'can i donate', 'who can donate', 'requirements', 'qualify'],
    bloodTypes: ['blood type', 'blood group', 'a+', 'a-', 'b+', 'b-', 'ab+', 'ab-', 'o+', 'o-', 'universal'],
    process: ['process', 'how to donate', 'donation process', 'steps', 'procedure'],
    frequency: ['how often', 'frequency', 'again', 'next donation', '90 days', 'wait'],
    benefits: ['benefit', 'why donate', 'advantage', 'help'],
    emergency: ['emergency', 'urgent', 'critical', 'immediate'],
    health: ['health', 'side effect', 'safe', 'risk', 'after donation'],
    preparation: ['prepare', 'before donation', 'eat', 'drink', 'food'],
    location: ['where', 'location', 'hospital', 'center', 'find'],
    time: ['how long', 'duration', 'time taken'],
    age: ['age', 'old', 'young', 'minimum age', 'maximum age'],
    weight: ['weight', 'kg', 'minimum weight'],
    diseases: ['disease', 'illness', 'sick', 'medication', 'medicine'],
    tattoo: ['tattoo', 'piercing', 'body art'],
    pregnancy: ['pregnant', 'pregnancy', 'breastfeeding'],
    alcohol: ['alcohol', 'drink', 'smoking', 'drugs'],
  };

  const responses = {
    greetings: [
      'Hello! How can I assist you with blood donation today?',
      'Hi there! I\'m here to help with any blood donation questions.',
      'Hey! What would you like to know about blood donation?'
    ],
    eligibility: [
      'To donate blood, you must:\n• Be 18-65 years old\n• Weigh at least 50 kg\n• Be in good health\n• Have no recent illness\n• Wait 90 days between donations\n• Have hemoglobin levels above 12.5 g/dL',
      'Blood donation eligibility criteria:\n✓ Age: 18-65 years\n✓ Weight: Minimum 50 kg\n✓ Health: Good overall health\n✓ No recent surgeries or illnesses\n✓ 90-day gap between donations'
    ],
    bloodTypes: [
      'Blood Types:\n• A+ (35.7%) - Can donate to A+, AB+\n• O+ (37.4%) - Universal for positive types\n• B+ (8.5%) - Can donate to B+, AB+\n• AB+ (3.4%) - Universal recipient\n• A- (6.3%) - Can donate to A+, A-, AB+, AB-\n• O- (6.6%) - Universal donor\n• B- (1.5%) - Can donate to B+, B-, AB+, AB-\n• AB- (0.6%) - Can donate to AB+, AB-',
      'Blood group compatibility:\n🅾️ O- is the universal donor (can give to all)\n🆎 AB+ is the universal recipient (can receive from all)\n💉 O+ can donate to all positive blood types\n❤️ Your blood type determines who you can help!'
    ],
    process: [
      'Blood Donation Process:\n1️⃣ Registration (5 min)\n2️⃣ Health screening & questionnaire (10 min)\n3️⃣ Hemoglobin test (2 min)\n4️⃣ Blood donation (10-15 min)\n5️⃣ Rest & refreshments (10 min)\n\nTotal time: ~45 minutes',
      'Steps to donate blood:\n✓ Fill registration form\n✓ Medical check-up\n✓ Blood pressure & hemoglobin test\n✓ Donation (450ml collected)\n✓ Rest and eat snacks\n✓ Receive certificate'
    ],
    frequency: [
      'You can donate blood every 90 days (3 months). This gap allows your body to fully replenish red blood cells. Our system automatically tracks your eligibility!',
      'Donation frequency:\n• Whole blood: Every 90 days\n• Platelets: Every 7 days (max 24 times/year)\n• Plasma: Every 28 days\n\nThe 90-day rule ensures your health and safety.'
    ],
    benefits: [
      'Benefits of donating blood:\n❤️ Save up to 3 lives per donation\n🩺 Free health screening\n💪 Reduces risk of heart disease\n🔄 Stimulates new blood cell production\n😊 Emotional satisfaction of helping others\n🏅 Earn donation badges in our system!',
      'Why donate blood?\n• One donation saves 3 lives\n• Free mini health check-up\n• Burns 650 calories\n• Reduces iron overload\n• Helps accident victims, surgery patients, cancer patients\n• Be a hero in your community!'
    ],
    emergency: [
      'Emergency blood needs:\n🚨 Mark your request as EMERGENCY in our system\n⚡ Emergency requests are highlighted to all donors\n📞 Donors receive priority notifications\n🏥 Hospitals can create urgent requests\n💉 O- blood is critical for emergencies',
      'For urgent blood requirements:\n1. Create request and mark as EMERGENCY\n2. Our AI recommends best matching donors\n3. Contact donors directly through the system\n4. Emergency requests appear with flashing badges\n5. Donors can accept requests immediately'
    ],
    health: [
      'Blood donation is safe!\n✅ Sterile, single-use needles\n✅ No risk of infection\n✅ Minimal side effects\n✅ Body replenishes blood in 24-48 hours\n\nMinor effects: Slight dizziness, bruising at needle site (rare)\n\nDrink plenty of fluids and rest after donation.',
      'Safety & side effects:\n• Completely safe procedure\n• Trained medical staff\n• Sterile equipment\n• Possible mild dizziness (drink water)\n• Small bruise at needle site\n• Fatigue (rest for a few hours)\n• Body fully recovers in 24 hours'
    ],
    preparation: [
      'Before donating blood:\n🥤 Drink 3-4 glasses of water\n🍽️ Eat iron-rich foods (spinach, red meat, beans)\n😴 Get good sleep (7-8 hours)\n🚫 Avoid fatty foods\n🚫 No alcohol 24 hours before\n✅ Bring ID proof\n✅ Eat a good breakfast/lunch',
      'Preparation tips:\n• Hydrate well (16 oz water)\n• Eat iron-rich meal 3 hours before\n• Avoid caffeine\n• Wear comfortable clothes\n• Bring donor card if you have one\n• Don\'t donate on empty stomach'
    ],
    location: [
      'Find donation centers:\n🏥 Use our Hospital Dashboard to see active requests\n📍 Filter by your city\n🔍 Check hospital names and locations\n📞 Contact hospitals directly\n💉 Many hospitals have blood banks',
      'Where to donate:\n• Registered hospitals in our system\n• Government blood banks\n• Red Cross centers\n• Mobile blood donation camps\n• Check our app for nearby requests'
    ],
    time: [
      'Time required:\n⏱️ Registration: 5 minutes\n⏱️ Screening: 10 minutes\n⏱️ Donation: 10-15 minutes\n⏱️ Rest: 10 minutes\n\n📊 Total: 35-45 minutes\n\nThe actual blood collection takes only 10-15 minutes!',
      'Duration breakdown:\n• Paperwork: 5 min\n• Health check: 10 min\n• Blood collection: 10-15 min\n• Recovery: 10 min\n\nPlan for about 1 hour total.'
    ],
    age: [
      'Age requirements:\n• Minimum: 18 years old\n• Maximum: 65 years old\n• First-time donors: 18-60 years\n• Regular donors can continue until 65\n\nAge ensures donor safety and blood quality.',
      'Age criteria for blood donation:\n✓ 18-65 years (general)\n✓ Some countries allow 16-17 with parental consent\n✓ After 60, doctor approval may be needed\n✓ No upper limit for regular healthy donors'
    ],
    weight: [
      'Weight requirement:\n⚖️ Minimum: 50 kg (110 lbs)\n\nWhy? Your body needs sufficient blood volume to safely donate 450ml without health risks. Lower weight may cause dizziness or weakness.',
      'Minimum weight: 50 kg\n\nThis ensures:\n• Safe donation volume\n• Adequate blood volume in your body\n• No adverse effects\n• Quick recovery'
    ],
    diseases: [
      'Medical conditions that may prevent donation:\n❌ HIV, Hepatitis B/C\n❌ Heart disease, high BP\n❌ Diabetes (insulin-dependent)\n❌ Cancer\n❌ Recent surgery (wait 6 months)\n❌ Active infection\n\n✅ Consult our medical team for specific conditions',
      'Health restrictions:\n• No cold/flu symptoms\n• No antibiotics (wait 2 weeks after)\n• No dental work (wait 24 hours)\n• No vaccination (varies by type)\n• Chronic conditions need doctor approval'
    ],
    tattoo: [
      'Tattoo & Piercing rules:\n🎨 Wait 6-12 months after getting a tattoo\n💍 Wait 6-12 months after piercing\n\nWhy? Risk of bloodborne infections during healing period. Ensures blood safety for recipients.',
      'Body modifications:\n• Tattoo: Wait 6-12 months\n• Piercing: Wait 6-12 months\n• Permanent makeup: Wait 12 months\n• Acupuncture: Wait 12 months\n\nThis protects both donor and recipient.'
    ],
    pregnancy: [
      'Pregnancy & breastfeeding:\n🤰 Cannot donate during pregnancy\n👶 Wait 6 months after delivery\n🤱 Wait 3 months after breastfeeding ends\n\nYour body needs time to recover and replenish nutrients.',
      'Maternal health guidelines:\n• Pregnant: Not eligible\n• Post-delivery: Wait 6 months\n• Breastfeeding: Wait until 3 months after stopping\n• Miscarriage: Wait 6 months\n\nPriority is mother and baby health.'
    ],
    alcohol: [
      'Substance guidelines:\n🍺 No alcohol 24 hours before donation\n🚬 Avoid smoking 2 hours before/after\n💊 No recreational drugs\n☕ Limit caffeine before donation\n\nThese affect blood quality and your recovery.',
      'Lifestyle restrictions:\n• Alcohol: Avoid 24 hours before\n• Smoking: Not 2 hours before/after\n• Drugs: Disqualifies donation\n• Caffeine: Moderate intake\n\nStay hydrated with water instead!'
    ],
    default: [
      'I can help you with:\n• Eligibility criteria\n• Blood types & compatibility\n• Donation process\n• Health & safety\n• Preparation tips\n• Emergency requests\n• Frequency & timing\n\nWhat would you like to know?',
      'Ask me about:\n💉 Who can donate blood\n🩸 Blood group information\n📋 Donation procedure\n⏰ How often to donate\n🏥 Finding donation centers\n🚨 Emergency blood needs\n💪 Health benefits\n\nHow can I assist you?'
    ]
  };

  const getResponse = (userInput) => {
    const input = userInput.toLowerCase().trim();
    
    if (knowledgeBase.greetings.some(word => input.includes(word))) {
      return responses.greetings[Math.floor(Math.random() * responses.greetings.length)];
    }
    
    for (const [category, keywords] of Object.entries(knowledgeBase)) {
      if (keywords.some(keyword => input.includes(keyword))) {
        const categoryResponses = responses[category];
        if (categoryResponses) {
          return categoryResponses[Math.floor(Math.random() * categoryResponses.length)];
        }
      }
    }
    
    return responses.default[Math.floor(Math.random() * responses.default.length)];
  };

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage = input.trim();
    setMessages(prev => [...prev, { type: 'user', text: userMessage }]);
    setInput('');
    setTyping(true);

    setTimeout(() => {
      const botResponse = getResponse(userMessage);
      setMessages(prev => [...prev, { type: 'bot', text: botResponse }]);
      setTyping(false);
    }, 800);
  };

  const quickQuestions = [
    { icon: '❓', text: 'Am I eligible?', query: 'eligibility criteria' },
    { icon: '🩸', text: 'Blood types', query: 'blood types' },
    { icon: '⏰', text: 'How often?', query: 'donation frequency' },
    { icon: '🚨', text: 'Emergency', query: 'emergency blood' },
  ];

  const handleQuickQuestion = (query) => {
    setInput(query);
    setTimeout(() => {
      const userMessage = query;
      setMessages(prev => [...prev, { type: 'user', text: userMessage }]);
      setInput('');
      setTyping(true);
      setTimeout(() => {
        const botResponse = getResponse(userMessage);
        setMessages(prev => [...prev, { type: 'bot', text: botResponse }]);
        setTyping(false);
      }, 800);
    }, 100);
  };

  return (
    <>
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

      {isOpen && (
        <div
          className="card position-fixed shadow-lg"
          style={{
            bottom: '90px',
            right: '20px',
            width: '380px',
            height: '550px',
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
            <small style={{ fontSize: '0.75rem', opacity: 0.9 }}>Ask me anything about blood donation</small>
          </div>
          
          <div className="card-body overflow-auto flex-grow-1 p-3" style={{ maxHeight: '380px' }}>
            {messages.map((msg, idx) => (
              <div key={idx} className={`mb-2 ${msg.type === 'user' ? 'text-end' : ''}`}>
                <div
                  className={`d-inline-block p-2 rounded ${
                    msg.type === 'user' ? 'bg-danger text-white' : 'bg-light text-dark'
                  }`}
                  style={{ maxWidth: '85%', whiteSpace: 'pre-wrap', fontSize: '0.9rem' }}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {typing && (
              <div className="mb-2">
                <div className="d-inline-block p-2 rounded bg-light">
                  <span className="spinner-border spinner-border-sm me-2" style={{ width: '12px', height: '12px' }}></span>
                  Typing...
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {messages.length === 1 && (
            <div className="px-3 pb-2">
              <small className="text-muted d-block mb-2">Quick questions:</small>
              <div className="d-flex flex-wrap gap-2">
                {quickQuestions.map((q, idx) => (
                  <button
                    key={idx}
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => handleQuickQuestion(q.query)}
                    style={{ fontSize: '0.75rem' }}
                  >
                    {q.icon} {q.text}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="card-footer p-2">
            <div className="input-group input-group-sm">
              <input
                type="text"
                className="form-control"
                placeholder="Ask me anything..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                disabled={typing}
                style={{ fontSize: '0.9rem' }}
              />
              <button className="btn btn-danger" onClick={handleSend} disabled={typing}>
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
