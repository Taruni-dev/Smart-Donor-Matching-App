const express = require('express');
const admin = require('firebase-admin');
const router = express.Router();
const Notification = require('../models/Notification'); // import model

const serviceAccount = require('../firebase-service-account.json'); // fix path if needed
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

// 🔔 Route to trigger a push notification
router.post('/send-notification', (req, res) => {
  const { title, body, token } = req.body;

  const message = {
    notification: {
      title: title || 'Blood Donation Camp Alert!',
      body: body || 'There’s a blood donation camp in your area. Help save lives!',
    },
    token,
  };

  admin.messaging().send(message)
    .then((response) => {
      console.log('Notification sent:', response);
      res.status(200).send({ success: true, response });
    })
    .catch((error) => {
      console.error('Notification error:', error);
      res.status(500).send({ success: false, error: error.message });
    });
});

// 🔔 Route to get stored notifications
router.get('/get-notifications', async (req, res) => {
  try {
    const notifications = await Notification.find();
    res.json(notifications);
  } catch (err) {
    console.error('Error fetching notifications:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
