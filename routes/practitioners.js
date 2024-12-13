const express = require('express');
const router = express.Router();
const Practitioner = require('../models/Practitioner');

// Get practitioner by name
router.get('/:name', async (req, res) => {
  try {
    const practitioner = await Practitioner.findOne({ 
      name: decodeURIComponent(req.params.name) 
    });
    
    if (!practitioner) {
      return res.status(404).json({ message: 'Practitioner not found' });
    }
    
    res.json(practitioner);
  } catch (error) {
    console.error('Error fetching practitioner:', error);
    res.status(500).json({ message: 'Error fetching practitioner details' });
  }
});

// Get all practitioners
router.get('/', async (req, res) => {
  try {
    const practitioners = await Practitioner.find().sort({ name: 1 });
    res.json(practitioners);
  } catch (error) {
    console.error('Error fetching practitioners:', error);
    res.status(500).json({ message: 'Error fetching practitioners' });
  }
});

module.exports = router;
