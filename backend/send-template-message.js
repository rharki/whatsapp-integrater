const axios = require('axios');
require('dotenv').config();

// WhatsApp API configuration
const WHATSAPP_ACCESS_TOKEN = process.env.WHATSAPP_ACCESS_TOKEN;
const WHATSAPP_PHONE_NUMBER_ID = process.env.WHATSAPP_PHONE_NUMBER_ID;

// The recipient's phone number in international format (country code + number, no plus sign)
const recipientPhoneNumber = '917022771245'; // +91 for India

// The template name and language code
const templateName = 'hello_world';
const languageCode = 'en_US';

// Function to send a template message
async function sendTemplateMessage() {
  try {
    // Check if required environment variables are set
    if (!WHATSAPP_ACCESS_TOKEN) {
      console.log('❌ WHATSAPP_ACCESS_TOKEN is not set in your .env file');
      return;
    }
    if (!WHATSAPP_PHONE_NUMBER_ID) {
      console.log('❌ WHATSAPP_PHONE_NUMBER_ID is not set in your .env file');
      return;
    }

    // Prepare the API endpoint
    const url = `https://graph.facebook.com/v18.0/${WHATSAPP_PHONE_NUMBER_ID}/messages`;

    // Prepare the request body
    const data = {
      messaging_product: 'whatsapp', // Always 'whatsapp' for WhatsApp Business API
      to: recipientPhoneNumber,      // Recipient's phone number (no plus sign)
      type: 'template',             // We're sending a template message
      template: {
        name: templateName,         // The template name (must match exactly)
        language: { code: languageCode } // The language code (must match approved template)
      }
    };

    // Send the POST request to WhatsApp API
    const response = await axios.post(url, data, {
      headers: {
        'Authorization': `Bearer ${WHATSAPP_ACCESS_TOKEN}`,
        'Content-Type': 'application/json'
      }
    });

    // If successful, print the message ID and status
    console.log('✅ Message sent successfully!');
    console.log('WhatsApp API response:', response.data);
  } catch (error) {
    // If there's an error, print it for troubleshooting
    console.error('❌ Error sending message:', error.message);
    if (error.response) {
      console.error('Response status:', error.response.status);
      console.error('Response data:', error.response.data);
    }
    console.log('\n💡 Troubleshooting tips:');
    console.log('1. Make sure your WHATSAPP_ACCESS_TOKEN is valid and not expired');
    console.log('2. Verify your WHATSAPP_PHONE_NUMBER_ID is correct');
    console.log('3. Ensure the recipient phone number is in the correct format and has WhatsApp');
    console.log('4. The template name and language code must match exactly as approved');
  }
}

// Run the function
sendTemplateMessage(); 