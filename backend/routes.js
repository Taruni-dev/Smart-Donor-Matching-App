const express = require('express');
const router = express.Router();
const { Recipient } = require('./models');
const { findMatchingDonors } = require('./matching');
const { Donor } = require('./models');

// Route to get matching donors
router.get('/match/:recipientId', async (req, res) => {
  try {
    const recipientId = req.params.recipientId;
    const donors = await findMatchingDonors(recipientId);
    res.json(donors);
  } catch (err) {
    console.error('Error in /match route:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Route to list all recipients
router.get('/recipients', async (req, res) => {
  try {
    const recipients = await Recipient.find();
    res.json(recipients);
  } catch (err) {
    console.error('Error fetching recipients:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


router.post('/recipients/sample', async (req, res) => {
    try {
      const sampleRecipient = new Recipient({
        name: 'Test Recipient',
        bloodType: 'A+',
        city: 'Hyderabad',
        location: {
          lat: 17.385044, // Hyderabad latitude
          lon: 78.486671  // Hyderabad longitude
        },
        requestDate: new Date()
      });
      await sampleRecipient.save();
      res.json({ message: 'Sample recipient created', recipient: sampleRecipient });
    } catch (err) {
      console.error('Error creating sample recipient:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
  router.post('/donors/sample', async (req, res) => {
    try {
      const sampleDonor = new Donor({
        name: 'Test Donor',
        bloodType: 'A+',
        city: 'Hyderabad',
        location: {
          lat: 17.4,  // Close to recipient location
          lon: 78.5
        },
        lastDonationDate: new Date('2025-04-15')
      });
      await sampleDonor.save();
      res.json({ message: 'Sample donor created', donor: sampleDonor });
    } catch (err) {
      console.error('Error creating sample donor:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
module.exports = router;
