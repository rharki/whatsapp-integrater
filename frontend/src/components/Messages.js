import React, { useState } from 'react';
import './Messages.css';

const Messages = () => {
  const [selectedTemplate, setSelectedTemplate] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [customValues, setCustomValues] = useState({});
  const [messages, setMessages] = useState([
    {
      id: 1,
      templateName: 'Welcome Message',
      phoneNumber: '+1234567890',
      content: 'Hello John! Welcome to our service.',
      status: 'delivered',
      sentAt: '2024-01-15 10:30:00'
    },
    {
      id: 2,
      templateName: 'Support Response',
      phoneNumber: '+1234567891',
      content: 'Hi Sarah, thank you for contacting us. Your ticket #12345 is being processed.',
      status: 'sent',
      sentAt: '2024-01-15 09:15:00'
    }
  ]);

  const templates = [
    { id: 1, name: 'Welcome Message', placeholders: ['name'] },
    { id: 2, name: 'Support Response', placeholders: ['name', 'ticketId'] }
  ];

  const handleSendMessage = () => {
    const newMessage = {
      id: Date.now(),
      templateName: selectedTemplate,
      phoneNumber: phoneNumber,
      content: `Message to ${phoneNumber} using template: ${selectedTemplate}`,
      status: 'pending',
      sentAt: new Date().toLocaleString()
    };
    setMessages([newMessage, ...messages]);
    setSelectedTemplate('');
    setPhoneNumber('');
    setCustomValues({});
  };

  return (
    <div className="messages">
      <h2>📤 Send Messages</h2>
      
      <div className="send-message-form">
        <h3>Send New Message</h3>
        
        <div className="form-group">
          <label>Select Template:</label>
          <select
            value={selectedTemplate}
            onChange={(e) => setSelectedTemplate(e.target.value)}
          >
            <option value="">Choose a template...</option>
            {templates.map(template => (
              <option key={template.id} value={template.name}>
                {template.name}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Phone Number:</label>
          <input
            type="text"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            placeholder="+1234567890"
          />
        </div>

        {selectedTemplate && (
          <div className="custom-values">
            <h4>Custom Values:</h4>
            {templates.find(t => t.name === selectedTemplate)?.placeholders.map(placeholder => (
              <div key={placeholder} className="form-group">
                <label>{placeholder}:</label>
                <input
                  type="text"
                  value={customValues[placeholder] || ''}
                  onChange={(e) => setCustomValues({
                    ...customValues,
                    [placeholder]: e.target.value
                  })}
                  placeholder={`Enter ${placeholder}`}
                />
              </div>
            ))}
          </div>
        )}

        <button 
          className="send-btn"
          onClick={handleSendMessage}
          disabled={!selectedTemplate || !phoneNumber}
        >
          Send Message
        </button>
      </div>

      <div className="message-history">
        <h3>📋 Message History</h3>
        <div className="messages-list">
          {messages.map(message => (
            <div key={message.id} className="message-card">
              <div className="message-header">
                <span className="phone-number">{message.phoneNumber}</span>
                <span className={`status-badge ${message.status}`}>
                  {message.status}
                </span>
              </div>
              <p className="template-name">Template: {message.templateName}</p>
              <p className="message-content">{message.content}</p>
              <p className="sent-time">Sent: {message.sentAt}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Messages; 