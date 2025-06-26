const { PrismaClient } = require('@prisma/client');
require('dotenv').config();

// Initialize Prisma client
const prisma = new PrismaClient();

// Hello World template data
const helloWorldTemplate = {
  name: 'hello_world',
  content: 'Hello World!',
  category: 'marketing',
  placeholders: JSON.stringify([]), // No placeholders for hello_world
  isActive: true
};

async function seedHelloWorldTemplate() {
  try {
    console.log('🌱 Seeding hello_world template to database...\n');

    // Check if template already exists
    const existingTemplate = await prisma.template.findFirst({
      where: {
        name: 'hello_world'
      }
    });

    if (existingTemplate) {
      console.log('✅ hello_world template already exists in database');
      console.log(`   ID: ${existingTemplate.id}`);
      console.log(`   Name: ${existingTemplate.name}`);
      console.log(`   Status: ${existingTemplate.isActive ? 'Active' : 'Inactive'}`);
      return;
    }

    // Create the template
    const newTemplate = await prisma.template.create({
      data: helloWorldTemplate
    });

    console.log('✅ Successfully added hello_world template to database!');
    console.log(`   ID: ${newTemplate.id}`);
    console.log(`   Name: ${newTemplate.name}`);
    console.log(`   Content: ${newTemplate.content}`);
    console.log(`   Category: ${newTemplate.category}`);
    console.log(`   Status: ${newTemplate.isActive ? 'Active' : 'Inactive'}`);
    console.log(`   Created: ${newTemplate.createdAt}`);

    console.log('\n🎉 The template will now appear in your frontend template management!');

  } catch (error) {
    console.error('❌ Error seeding template:', error.message);
    
    if (error.code === 'P2002') {
      console.log('💡 This template might already exist with a different name');
    }
  } finally {
    await prisma.$disconnect();
  }
}

// Run the seeding function
seedHelloWorldTemplate(); 