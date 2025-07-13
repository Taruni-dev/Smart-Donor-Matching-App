const express = require('express');
const router = express.Router();
const Camp = require('../models/Camp');

// GET all camps (no location filter)
router.get('/', async (req, res) => {
  try {
    const camps = await Camp.find();
    console.log("Camps sent:", camps.length); // optional debug
    res.json(camps);
  } catch (error) {
    console.error('Error fetching camps:', error);
    res.status(500).json({ message: 'Error fetching camps' });
  }
});

module.exports = router;
