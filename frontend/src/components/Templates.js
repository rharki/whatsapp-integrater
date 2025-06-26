import React, { useState, useEffect } from 'react';
import './Templates.css';

const Templates = () => {
  // State for templates data
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // State for create form
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newTemplate, setNewTemplate] = useState({
    name: '',
    content: '',
    category: 'marketing',
    placeholders: ''
  });

  // API base URL - adjust this to match your backend URL
  const API_BASE_URL = 'http://localhost:3001/api/v1';

  // Function to fetch templates from backend
  const fetchTemplates = async () => {
    try {
      setLoading(true);
      setError(null);
      
      console.log('🔍 Fetching templates from backend...');
      const response = await fetch(`${API_BASE_URL}/templates`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('✅ Templates fetched successfully:', data);
      
      // Update templates state with real data
      setTemplates(data.templates || []);
      
    } catch (error) {
      console.error('❌ Error fetching templates:', error);
      setError('Failed to load templates. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  // Function to create a new template
  const handleCreateTemplate = async () => {
    try {
      const templateData = {
        name: newTemplate.name,
        content: newTemplate.content,
        category: newTemplate.category,
        placeholders: JSON.stringify(newTemplate.placeholders.split(',').map(p => p.trim()))
      };

      const response = await fetch(`${API_BASE_URL}/templates`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(templateData)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log('✅ Template created successfully:', result);
      
      // Refresh the templates list
      await fetchTemplates();
      
      // Reset form
      setNewTemplate({ name: '', content: '', category: 'marketing', placeholders: '' });
      setShowCreateForm(false);
      
    } catch (error) {
      console.error('❌ Error creating template:', error);
      setError('Failed to create template. Please try again.');
    }
  };

  // Function to delete a template
  const handleDeleteTemplate = async (templateId) => {
    if (!window.confirm('Are you sure you want to delete this template?')) {
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/templates/${templateId}`, {
        method: 'DELETE'
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      console.log('✅ Template deleted successfully');
      
      // Refresh the templates list
      await fetchTemplates();
      
    } catch (error) {
      console.error('❌ Error deleting template:', error);
      setError('Failed to delete template. Please try again.');
    }
  };

  // Fetch templates when component mounts
  useEffect(() => {
    fetchTemplates();
  }, []);

  // Helper function to parse placeholders from JSON string
  const parsePlaceholders = (placeholdersString) => {
    try {
      return JSON.parse(placeholdersString) || [];
    } catch (error) {
      console.error('Error parsing placeholders:', error);
      return [];
    }
  };

  return (
    <div className="templates">
      <div className="templates-header">
        <h2>📝 Message Templates</h2>
        <div className="template-stats">
          <span className="template-count">
            {loading ? 'Loading...' : `${templates.length} template${templates.length !== 1 ? 's' : ''}`}
          </span>
        </div>
        <button 
          className="create-btn"
          onClick={() => setShowCreateForm(true)}
        >
          + Create Template
        </button>
      </div>

      {/* Error Message */}
      {error && (
        <div className="error-message">
          <p>❌ {error}</p>
          <button onClick={fetchTemplates}>Retry</button>
        </div>
      )}

      {/* Loading State */}
      {loading && (
        <div className="loading-state">
          <p>🔄 Loading templates...</p>
        </div>
      )}

      {/* Create Template Form */}
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

      {/* Templates List */}
      {!loading && !error && (
        <div className="templates-list">
          {templates.length === 0 ? (
            <div className="no-templates">
              <p>📝 No templates found. Create your first template!</p>
            </div>
          ) : (
            templates.map(template => {
              const placeholders = parsePlaceholders(template.placeholders);
              return (
                <div key={template.id} className="template-card">
                  <div className="template-header">
                    <h3>{template.name}</h3>
                    <span className="category-badge">{template.category}</span>
                  </div>
                  <p className="template-content">{template.content}</p>
                  <div className="template-placeholders">
                    <strong>Placeholders:</strong> {placeholders.length > 0 ? placeholders.join(', ') : 'None'}
                  </div>
                  <div className="template-meta">
                    <span className="template-status">
                      Status: {template.isActive ? '✅ Active' : '❌ Inactive'}
                    </span>
                    <span className="template-date">
                      Created: {new Date(template.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="template-actions">
                    <button className="edit-btn">Edit</button>
                    <button 
                      className="delete-btn"
                      onClick={() => handleDeleteTemplate(template.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      )}
    </div>
  );
};

export default Templates; 