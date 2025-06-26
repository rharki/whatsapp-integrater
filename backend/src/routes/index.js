const express = require('express');
const router = express.Router();

// Import route modules
const templateRoutes = require('./templates');
const messageRoutes = require('./messages');
const responseRoutes = require('./responses');
const pollRoutes = require('./polls');
const webhookRoutes = require('./webhooks');

// API version prefix
const API_PREFIX = '/api/v1';

// Mount routes
router.use(`${API_PREFIX}/templates`, templateRoutes);
router.use(`${API_PREFIX}/messages`, messageRoutes);
router.use(`${API_PREFIX}/responses`, responseRoutes);
router.use(`${API_PREFIX}/polls`, pollRoutes);
router.use(`${API_PREFIX}/webhooks`, webhookRoutes);

// API info endpoint
router.get(`${API_PREFIX}/info`, (req, res) => {
  res.json({
    name: 'WhatsApp Integrator API',
    version: '1.0.0',
    description: 'API for managing WhatsApp message templates, sending messages, and handling responses',
    endpoints: {
      templates: `${API_PREFIX}/templates`,
      messages: `${API_PREFIX}/messages`,
      responses: `${API_PREFIX}/responses`,
      polls: `${API_PREFIX}/polls`,
      webhooks: `${API_PREFIX}/webhooks`
    }
  });
});

module.exports = router; 