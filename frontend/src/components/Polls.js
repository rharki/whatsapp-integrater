import React, { useState } from 'react';
import './Polls.css';

const Polls = () => {
  const [polls, setPolls] = useState([
    {
      id: 1,
      question: 'How satisfied are you with our service?',
      options: ['Very Satisfied', 'Satisfied', 'Neutral', 'Dissatisfied'],
      isActive: true,
      responses: [
        { option: 'Very Satisfied', count: 15 },
        { option: 'Satisfied', count: 8 },
        { option: 'Neutral', count: 3 },
        { option: 'Dissatisfied', count: 1 }
      ]
    },
    {
      id: 2,
      question: 'Which feature would you like to see next?',
      options: ['Mobile App', 'API Integration', 'Advanced Analytics', 'Custom Templates'],
      isActive: true,
      responses: [
        { option: 'Mobile App', count: 12 },
        { option: 'API Integration', count: 18 },
        { option: 'Advanced Analytics', count: 7 },
        { option: 'Custom Templates', count: 5 }
      ]
    }
  ]);

  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newPoll, setNewPoll] = useState({
    question: '',
    options: ['', '']
  });

  const handleCreatePoll = () => {
    const poll = {
      id: Date.now(),
      question: newPoll.question,
      options: newPoll.options.filter(option => option.trim() !== ''),
      isActive: true,
      responses: newPoll.options.filter(option => option.trim() !== '').map(option => ({
        option: option.trim(),
        count: 0
      }))
    };
    setPolls([...polls, poll]);
    setNewPoll({ question: '', options: ['', ''] });
    setShowCreateForm(false);
  };

  const addOption = () => {
    setNewPoll({
      ...newPoll,
      options: [...newPoll.options, '']
    });
  };

  const updateOption = (index, value) => {
    const updatedOptions = [...newPoll.options];
    updatedOptions[index] = value;
    setNewPoll({
      ...newPoll,
      options: updatedOptions
    });
  };

  return (
    <div className="polls">
      <div className="polls-header">
        <h2>📊 Polls</h2>
        <button 
          className="create-btn"
          onClick={() => setShowCreateForm(true)}
        >
          + Create Poll
        </button>
      </div>

      {showCreateForm && (
        <div className="create-poll-form">
          <h3>Create New Poll</h3>
          
          <div className="form-group">
            <label>Poll Question:</label>
            <input
              type="text"
              value={newPoll.question}
              onChange={(e) => setNewPoll({...newPoll, question: e.target.value})}
              placeholder="Enter your poll question"
            />
          </div>

          <div className="form-group">
            <label>Poll Options:</label>
            {newPoll.options.map((option, index) => (
              <input
                key={index}
                type="text"
                value={option}
                onChange={(e) => updateOption(index, e.target.value)}
                placeholder={`Option ${index + 1}`}
              />
            ))}
            <button onClick={addOption} className="add-option-btn">
              + Add Option
            </button>
          </div>

          <div className="form-actions">
            <button onClick={handleCreatePoll}>Create Poll</button>
            <button onClick={() => setShowCreateForm(false)}>Cancel</button>
          </div>
        </div>
      )}

      <div className="polls-list">
        {polls.map(poll => (
          <div key={poll.id} className="poll-card">
            <div className="poll-header">
              <h3>{poll.question}</h3>
              <span className={`status-badge ${poll.isActive ? 'active' : 'inactive'}`}>
                {poll.isActive ? 'Active' : 'Inactive'}
              </span>
            </div>
            
            <div className="poll-results">
              {poll.responses.map((response, index) => {
                const total = poll.responses.reduce((sum, r) => sum + r.count, 0);
                const percentage = total > 0 ? Math.round((response.count / total) * 100) : 0;
                
                return (
                  <div key={index} className="poll-option">
                    <div className="option-header">
                      <span className="option-text">{response.option}</span>
                      <span className="option-count">{response.count} votes ({percentage}%)</span>
                    </div>
                    <div className="progress-bar">
                      <div 
                        className="progress-fill" 
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
            
            <div className="poll-footer">
              <span className="total-votes">
                Total Votes: {poll.responses.reduce((sum, r) => sum + r.count, 0)}
              </span>
              <div className="poll-actions">
                <button className="action-btn">Send Poll</button>
                <button className="action-btn">View Details</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Polls; 