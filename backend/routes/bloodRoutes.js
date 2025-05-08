const express = require('express');
const router = express.Router();

// Blood Expiry Logic - adds 42 days to donation date
router.post('/expiry', (req, res) => {
  const { donationDate } = req.body;

  if (!donationDate) {
    return res.status(400).json({ error: 'Donation date is required' });
  }

  const donation = new Date(donationDate);
  const expiry = new Date(donation);
  expiry.setDate(expiry.getDate() + 42); // standard shelf life for red blood cells

  res.json({
    donationDate: donation.toISOString().split('T')[0],
    expiryDate: expiry.toISOString().split('T')[0]
  });
});

module.exports = router;
