const express = require('express');
const router = express.Router();
const Practitioner = require('../models/practitioner');

// Get all practitioners
router.get('/', async (req, res) => {
  try {
    console.log('Fetching all practitioners...');
    const practitioners = await Practitioner.find();
    console.log(`Found ${practitioners.length} practitioners`);
    res.json(practitioners);
  } catch (error) {
    console.error('Error fetching practitioners:', error);
    res.status(500).json({ message: 'Error fetching practitioners', error: error.message });
  }
});

// Get practitioner by name
router.get('/name/:name', async (req, res) => {
  try {
    const decodedName = decodeURIComponent(req.params.name);
    console.log('Fetching practitioner by name:', decodedName);
    
    const practitioner = await Practitioner.findOne({
      name: { $regex: new RegExp('^' + decodedName + '$', 'i') }
    });

    if (!practitioner) {
      console.log('No practitioner found with name:', decodedName);
      return res.status(404).json({ message: 'Practitioner not found' });
    }

    console.log('Found practitioner:', practitioner.name);
    res.json(practitioner);
  } catch (error) {
    console.error('Error fetching practitioner by name:', error);
    res.status(500).json({ message: 'Error fetching practitioner', error: error.message });
  }
});

// Get practitioner by ID
router.get('/:id', async (req, res) => {
  try {
    console.log('Fetching practitioner by ID:', req.params.id);
    const practitioner = await Practitioner.findById(req.params.id);
    if (!practitioner) {
      console.log('No practitioner found with ID:', req.params.id);
      return res.status(404).json({ message: 'Practitioner not found' });
    }
    console.log('Found practitioner:', practitioner.name);
    res.json(practitioner);
  } catch (error) {
    console.error('Error fetching practitioner by ID:', error);
    res.status(500).json({ message: 'Error fetching practitioner', error: error.message });
  }
});

module.exports = router;
