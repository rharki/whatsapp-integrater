const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

// Import routes
const apiRoutes = require('./routes');

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors()); // Enable CORS for frontend communication
app.use(bodyParser.json()); // Parse JSON request bodies
app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded bodies

// Basic route for testing
app.get('/', (req, res) => {
  res.json({ 
    message: 'WhatsApp Integrator API is running!',
    status: 'success',
    timestamp: new Date().toISOString(),
    endpoints: {
      health: '/health',
      apiInfo: '/api/v1/info',
      templates: '/api/v1/templates',
      messages: '/api/v1/messages',
      responses: '/api/v1/responses',
      polls: '/api/v1/polls',
      webhooks: '/api/v1/webhooks'
    }
  });
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    status: 'healthy',
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  });
});

// Mount API routes - mount at root since routes already have their paths
app.use(apiRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err.stack);
  res.status(500).json({ 
    error: 'Something went wrong!',
    message: err.message 
  });
});

// 404 handler for undefined routes
app.use('*', (req, res) => {
  res.status(404).json({ 
    error: 'Route not found',
    path: req.originalUrl 
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
  console.log(`📡 Health check: http://localhost:${PORT}/health`);
  console.log(`🌐 API base URL: http://localhost:${PORT}`);
  console.log(`📋 API info: http://localhost:${PORT}/api/v1/info`);
});

module.exports = app; 