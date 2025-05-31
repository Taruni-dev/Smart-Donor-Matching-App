const express = require('express');
const router = express.Router();
const Donor = require('../models/Donor');

// POST /api/request
router.post('/', async (req, res) => {
  const { city, bloodType } = req.body;

  if (!city || !bloodType) {
    return res.status(400).json({ message: 'City and blood type are required' });
  }

  try {
    const matchedDonors = await Donor.find({ city, bloodType }); // You can enhance this with case-insensitive or regex matching
    res.json(matchedDonors);
  } catch (error) {
    console.error('Error fetching donors:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
