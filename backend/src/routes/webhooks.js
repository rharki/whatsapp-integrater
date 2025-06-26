const express = require('express');
const router = express.Router();

// GET /api/v1/webhooks - Webhook verification (for WhatsApp)
router.get('/', async (req, res) => {
  try {
    // WhatsApp webhook verification
    const mode = req.query['hub.mode'];
    const token = req.query['hub.verify_token'];
    const challenge = req.query['hub.challenge'];

    const verifyToken = process.env.WEBHOOK_VERIFY_TOKEN;

    if (mode === 'subscribe' && token === verifyToken) {
      console.log('✅ Webhook verified successfully');
      res.status(200).send(challenge);
    } else {
      console.log('❌ Webhook verification failed');
      res.status(403).json({ error: 'Verification failed' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST /api/v1/webhooks - Handle incoming webhook events
router.post('/', async (req, res) => {
  try {
    console.log('📨 Received webhook:', JSON.stringify(req.body, null, 2));
    
    // TODO: Implement webhook event processing
    // - Handle message events
    // - Handle button click events
    // - Handle poll response events
    
    res.status(200).json({ status: 'ok' });
  } catch (error) {
    console.error('❌ Webhook processing error:', error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router; 