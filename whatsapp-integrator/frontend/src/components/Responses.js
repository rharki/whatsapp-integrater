import React, { useState } from 'react';
import './Responses.css';

const Responses = () => {
  const [responses, setResponses] = useState([
    {
      id: 1,
      phoneNumber: '+1234567890',
      responseType: 'text',
      content: 'Thank you! I received the message.',
      receivedAt: '2024-01-15 10:35:00',
      originalMessage: 'Hello John! Welcome to our service.'
    },
    {
      id: 2,
      phoneNumber: '+1234567891',
      responseType: 'button',
      content: 'Get Support',
      receivedAt: '2024-01-15 09:20:00',
      originalMessage: 'Hi Sarah, thank you for contacting us. Your ticket #12345 is being processed.'
    }
  ]);

  const [filterType, setFilterType] = useState('all');

  const filteredResponses = responses.filter(response => {
    if (filterType === 'all') return true;
    return response.responseType === filterType;
  });

  return (
    <div className="responses">
      <h2>📥 User Responses</h2>
      
      <div className="responses-header">
        <div className="filter-controls">
          <label>Filter by type:</label>
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
          >
            <option value="all">All Responses</option>
            <option value="text">Text Messages</option>
            <option value="button">Button Clicks</option>
            <option value="poll">Poll Responses</option>
          </select>
        </div>
        
        <div className="stats">
          <span>Total Responses: {responses.length}</span>
        </div>
      </div>

      <div className="responses-list">
        {filteredResponses.map(response => (
          <div key={response.id} className="response-card">
            <div className="response-header">
              <span className="phone-number">{response.phoneNumber}</span>
              <span className={`response-type ${response.responseType}`}>
                {response.responseType}
              </span>
            </div>
            
            <div className="response-content">
              <p><strong>Response:</strong> {response.content}</p>
              <p><strong>Original Message:</strong> {response.originalMessage}</p>
            </div>
            
            <div className="response-footer">
              <span className="received-time">
                Received: {response.receivedAt}
              </span>
              <div className="response-actions">
                <button className="action-btn">Reply</button>
                <button className="action-btn">View Details</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredResponses.length === 0 && (
        <div className="no-responses">
          <p>No responses found for the selected filter.</p>
        </div>
      )}
    </div>
  );
};

export default Responses; 