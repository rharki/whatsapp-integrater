const axios = require('axios');
require('dotenv').config();

// WhatsApp API configuration
const WHATSAPP_ACCESS_TOKEN = process.env.WHATSAPP_ACCESS_TOKEN;
const WHATSAPP_BUSINESS_ACCOUNT_ID = process.env.WHATSAPP_BUSINESS_ACCOUNT_ID;
const WHATSAPP_PHONE_NUMBER_ID = process.env.WHATSAPP_PHONE_NUMBER_ID;

// Function to check existing templates
async function checkTemplates() {
  try {
    console.log('🔍 Checking for existing templates in your WhatsApp account...\n');
    
    // Check if required environment variables are set
    if (!WHATSAPP_ACCESS_TOKEN) {
      console.log('❌ WHATSAPP_ACCESS_TOKEN is not set in your .env file');
      console.log('Please add your WhatsApp access token to the .env file');
      return;
    }
    
    if (!WHATSAPP_BUSINESS_ACCOUNT_ID) {
      console.log('❌ WHATSAPP_BUSINESS_ACCOUNT_ID is not set in your .env file');
      console.log('Please add your WhatsApp business account ID to the .env file');
      return;
    }

    console.log('📞 Using Business Account ID:', WHATSAPP_BUSINESS_ACCOUNT_ID);
    console.log('📱 Phone Number ID:', WHATSAPP_PHONE_NUMBER_ID || 'Not set');
    console.log('');

    // Method 1: Try to get templates from business account
    try {
      console.log('🔍 Method 1: Checking templates via Business Account...');
      const response = await axios.get(
        `https://graph.facebook.com/v18.0/${WHATSAPP_BUSINESS_ACCOUNT_ID}/message_templates`,
        {
          headers: {
            'Authorization': `Bearer ${WHATSAPP_ACCESS_TOKEN}`,
            'Content-Type': 'application/json'
          }
        }
      );

      const templates = response.data.data;
      
      console.log(`✅ Found ${templates.length} template(s) in your WhatsApp account:\n`);
      
      if (templates.length === 0) {
        console.log('📝 No templates found. You can create new templates through your application.');
        return;
      }

      // Display all templates
      templates.forEach((template, index) => {
        console.log(`${index + 1}. Template Name: ${template.name}`);
        console.log(`   Status: ${template.status}`);
        console.log(`   Category: ${template.category}`);
        console.log(`   Language: ${template.language}`);
        console.log(`   Content: ${template.components?.[0]?.text || 'N/A'}`);
        console.log('');
      });

      // Check specifically for hello_world template
      const helloWorldTemplate = templates.find(template => 
        template.name.toLowerCase() === 'hello_world' || 
        template.name.toLowerCase().includes('hello_world')
      );

      if (helloWorldTemplate) {
        console.log('🎉 Found "hello_world" template!');
        console.log(`   Name: ${helloWorldTemplate.name}`);
        console.log(`   Status: ${helloWorldTemplate.status}`);
        console.log(`   Category: ${helloWorldTemplate.category}`);
      } else {
        console.log('❌ "hello_world" template not found in your account.');
        console.log('You may need to create it or it might have a different name.');
      }

    } catch (businessError) {
      console.log('❌ Method 1 failed:', businessError.response?.data?.error?.message || businessError.message);
      
      // Method 2: Try to get templates from phone number (alternative approach)
      if (WHATSAPP_PHONE_NUMBER_ID) {
        try {
          console.log('\n🔍 Method 2: Checking templates via Phone Number...');
          const phoneResponse = await axios.get(
            `https://graph.facebook.com/v18.0/${WHATSAPP_PHONE_NUMBER_ID}`,
            {
              headers: {
                'Authorization': `Bearer ${WHATSAPP_ACCESS_TOKEN}`,
                'Content-Type': 'application/json'
              },
              params: {
                fields: 'id,name,code_verification_status,quality_rating,verified_name'
              }
            }
          );

          console.log('📱 Phone Number Details:');
          console.log('   ID:', phoneResponse.data.id);
          console.log('   Name:', phoneResponse.data.name);
          console.log('   Verification Status:', phoneResponse.data.code_verification_status);
          console.log('   Quality Rating:', phoneResponse.data.quality_rating);
          console.log('   Verified Name:', phoneResponse.data.verified_name);
          
          console.log('\n💡 Note: Templates are managed at the Business Account level, not the phone number level.');
          console.log('   You may need to check your Meta Developer Console for template management.');
          
        } catch (phoneError) {
          console.log('❌ Method 2 failed:', phoneError.response?.data?.error?.message || phoneError.message);
        }
      }
    }

  } catch (error) {
    console.error('❌ Error checking templates:', error.message);
    
    if (error.response) {
      console.error('Response status:', error.response.status);
      console.error('Response data:', error.response.data);
    }
    
    console.log('\n💡 Troubleshooting tips:');
    console.log('1. Make sure your WHATSAPP_ACCESS_TOKEN is valid');
    console.log('2. Verify your WHATSAPP_BUSINESS_ACCOUNT_ID is correct');
    console.log('3. Check if your WhatsApp Business API account is properly set up');
    console.log('4. Ensure you have the correct permissions for template management');
  }
}

// Run the check
checkTemplates(); 