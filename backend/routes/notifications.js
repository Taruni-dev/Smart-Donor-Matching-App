const express = require('express');
const admin = require('firebase-admin');
const router = express.Router();

// Your Firebase setup code here
const serviceAccount = require('./firebase-service-account.json');
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

// Route to trigger a notification
router.post('/send-notification', (req, res) => {
    const { title, body, token } = req.body;  // Assuming you send notification details via a POST request

    const message = {
        notification: {
            title: title || 'Blood Donation Camp Alert!',
            body: body || 'There’s a blood donation camp in your area. Help save lives!',
        },
        token: token,  // Firebase Cloud Messaging token of the recipient
    };

    admin.messaging().send(message)
        .then((response) => {
            console.log('Notification sent successfully:', response);
            res.status(200).send({ success: true, response });
        })
        .catch((error) => {
            console.error('Error sending notification:', error);
            res.status(500).send({ success: false, error: error.message });
        });
});

module.exports = router;
