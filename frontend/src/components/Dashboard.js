import React, { useState, useEffect } from 'react';
import './Dashboard.css';

const Dashboard = () => {
  const [stats, setStats] = useState({
    templates: 0,
    messages: 0,
    responses: 0,
    polls: 0
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch real template count from backend
    fetch('http://localhost:3001/api/v1/templates')
      .then(res => res.json())
      .then(data => {
        setStats({
          templates: data.templates.length,
          messages: 25, // keep mock data for now
          responses: 12, // keep mock data for now
          polls: 3 // keep mock data for now
        });
        setLoading(false);
      })
      .catch(() => {
        setStats({
          templates: 0,
          messages: 25,
          responses: 12,
          polls: 3
        });
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="dashboard">
        <h2>📊 Dashboard</h2>
        <p>Loading statistics...</p>
      </div>
    );
  }

  return (
    <div className="dashboard">
      <h2>📊 Dashboard</h2>
      
      <div className="stats-grid">
        <div className="stat-card">
          <h3>📝 Templates</h3>
          <p className="stat-number">{stats.templates}</p>
          <p className="stat-label">Message templates created</p>
        </div>
        
        <div className="stat-card">
          <h3>📤 Messages</h3>
          <p className="stat-number">{stats.messages}</p>
          <p className="stat-label">Messages sent</p>
        </div>
        
        <div className="stat-card">
          <h3>📥 Responses</h3>
          <p className="stat-number">{stats.responses}</p>
          <p className="stat-label">User responses received</p>
        </div>
        
        <div className="stat-card">
          <h3>📊 Polls</h3>
          <p className="stat-number">{stats.polls}</p>
          <p className="stat-label">Active polls</p>
        </div>
      </div>

      <div className="quick-actions">
        <h3>🚀 Quick Actions</h3>
        <div className="action-buttons">
          <button className="action-btn">Create Template</button>
          <button className="action-btn">Send Message</button>
          <button className="action-btn">Create Poll</button>
          <button className="action-btn">View Responses</button>
        </div>
      </div>

      <div className="recent-activity">
        <h3>📈 Recent Activity</h3>
        <div className="activity-list">
          <div className="activity-item">
            <span className="activity-time">2 hours ago</span>
            <span className="activity-text">Message sent to +1234567890</span>
          </div>
          <div className="activity-item">
            <span className="activity-time">4 hours ago</span>
            <span className="activity-text">Response received from +1234567890</span>
          </div>
          <div className="activity-item">
            <span className="activity-time">1 day ago</span>
            <span className="activity-text">New template "Welcome Message" created</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 