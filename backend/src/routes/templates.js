const express = require('express');
const { PrismaClient } = require('@prisma/client');
const router = express.Router();

// Initialize Prisma client
const prisma = new PrismaClient();

// GET /api/v1/templates - Get all templates
router.get('/', async (req, res) => {
  try {
    console.log('🔍 Fetching all templates from database...');
    
    const templates = await prisma.template.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    });

    console.log(`✅ Found ${templates.length} templates`);
    
    res.json({ 
      message: 'Templates fetched successfully',
      status: 'success',
      templates: templates
    });
  } catch (error) {
    console.error('❌ Error fetching templates:', error);
    res.status(500).json({ error: error.message });
  }
});

// GET /api/v1/templates/:id - Get template by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    console.log(`🔍 Fetching template with ID: ${id}`);
    
    const template = await prisma.template.findUnique({
      where: { id: id }
    });

    if (!template) {
      return res.status(404).json({ 
        error: 'Template not found',
        status: 'error'
      });
    }

    console.log(`✅ Template found: ${template.name}`);
    
    res.json({ 
      message: 'Template fetched successfully',
      status: 'success',
      template: template
    });
  } catch (error) {
    console.error('❌ Error fetching template:', error);
    res.status(500).json({ error: error.message });
  }
});

// POST /api/v1/templates - Create new template
router.post('/', async (req, res) => {
  try {
    const { name, content, category, placeholders } = req.body;
    
    console.log('🔍 Creating new template:', { name, category });
    
    // Validate required fields
    if (!name || !content || !category) {
      return res.status(400).json({
        error: 'Name, content, and category are required',
        status: 'error'
      });
    }

    const newTemplate = await prisma.template.create({
      data: {
        name,
        content,
        category,
        placeholders: placeholders || JSON.stringify([]),
        isActive: true
      }
    });

    console.log(`✅ Template created successfully: ${newTemplate.name}`);
    
    res.status(201).json({ 
      message: 'Template created successfully',
      status: 'success',
      template: newTemplate
    });
  } catch (error) {
    console.error('❌ Error creating template:', error);
    
    if (error.code === 'P2002') {
      return res.status(400).json({
        error: 'Template with this name already exists',
        status: 'error'
      });
    }
    
    res.status(500).json({ error: error.message });
  }
});

// PUT /api/v1/templates/:id - Update template
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, content, category, placeholders, isActive } = req.body;
    
    console.log(`🔍 Updating template with ID: ${id}`);
    
    const updatedTemplate = await prisma.template.update({
      where: { id: id },
      data: {
        name,
        content,
        category,
        placeholders,
        isActive,
        updatedAt: new Date()
      }
    });

    console.log(`✅ Template updated successfully: ${updatedTemplate.name}`);
    
    res.json({ 
      message: 'Template updated successfully',
      status: 'success',
      template: updatedTemplate
    });
  } catch (error) {
    console.error('❌ Error updating template:', error);
    
    if (error.code === 'P2025') {
      return res.status(404).json({
        error: 'Template not found',
        status: 'error'
      });
    }
    
    res.status(500).json({ error: error.message });
  }
});

// DELETE /api/v1/templates/:id - Delete template
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    console.log(`🔍 Deleting template with ID: ${id}`);
    
    const deletedTemplate = await prisma.template.delete({
      where: { id: id }
    });

    console.log(`✅ Template deleted successfully: ${deletedTemplate.name}`);
    
    res.json({ 
      message: 'Template deleted successfully',
      status: 'success',
      template: deletedTemplate
    });
  } catch (error) {
    console.error('❌ Error deleting template:', error);
    
    if (error.code === 'P2025') {
      return res.status(404).json({
        error: 'Template not found',
        status: 'error'
      });
    }
    
    res.status(500).json({ error: error.message });
  }
});

module.exports = router; 