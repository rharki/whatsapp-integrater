import React, { useState } from 'react';
import './Templates.css';

const Templates = () => {
  const [templates, setTemplates] = useState([
    {
      id: 1,
      name: 'Welcome Message',
      content: 'Hello {{name}}! Welcome to our service.',
      category: 'marketing',
      placeholders: ['name']
    },
    {
      id: 2,
      name: 'Support Response',
      content: 'Hi {{name}}, thank you for contacting us. Your ticket #{{ticketId}} is being processed.',
      category: 'support',
      placeholders: ['name', 'ticketId']
    }
  ]);

  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newTemplate, setNewTemplate] = useState({
    name: '',
    content: '',
    category: 'marketing',
    placeholders: ''
  });

  const handleCreateTemplate = () => {
    const template = {
      id: Date.now(),
      ...newTemplate,
      placeholders: newTemplate.placeholders.split(',').map(p => p.trim())
    };
    setTemplates([...templates, template]);
    setNewTemplate({ name: '', content: '', category: 'marketing', placeholders: '' });
    setShowCreateForm(false);
  };

  return (
    <div className="templates">
      <div className="templates-header">
        <h2>📝 Message Templates</h2>
        <button 
          className="create-btn"
          onClick={() => setShowCreateForm(true)}
        >
          + Create Template
        </button>
      </div>

      {showCreateForm && (
        <div className="create-form">
          <h3>Create New Template</h3>
          <div className="form-group">
            <label>Template Name:</label>
            <input
              type="text"
              value={newTemplate.name}
              onChange={(e) => setNewTemplate({...newTemplate, name: e.target.value})}
              placeholder="Enter template name"
            />
          </div>
          <div className="form-group">
            <label>Category:</label>
            <select
              value={newTemplate.category}
              onChange={(e) => setNewTemplate({...newTemplate, category: e.target.value})}
            >
              <option value="marketing">Marketing</option>
              <option value="support">Support</option>
              <option value="notification">Notification</option>
            </select>
          </div>
          <div className="form-group">
            <label>Content:</label>
            <textarea
              value={newTemplate.content}
              onChange={(e) => setNewTemplate({...newTemplate, content: e.target.value})}
              placeholder="Enter template content. Use {{placeholder}} for dynamic values."
              rows="4"
            />
          </div>
          <div className="form-group">
            <label>Placeholders (comma-separated):</label>
            <input
              type="text"
              value={newTemplate.placeholders}
              onChange={(e) => setNewTemplate({...newTemplate, placeholders: e.target.value})}
              placeholder="name, company, orderId"
            />
          </div>
          <div className="form-actions">
            <button onClick={handleCreateTemplate}>Create Template</button>
            <button onClick={() => setShowCreateForm(false)}>Cancel</button>
          </div>
        </div>
      )}

      <div className="templates-list">
        {templates.map(template => (
          <div key={template.id} className="template-card">
            <div className="template-header">
              <h3>{template.name}</h3>
              <span className="category-badge">{template.category}</span>
            </div>
            <p className="template-content">{template.content}</p>
            <div className="template-placeholders">
              <strong>Placeholders:</strong> {template.placeholders.join(', ')}
            </div>
            <div className="template-actions">
              <button className="edit-btn">Edit</button>
              <button className="delete-btn">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Templates; 