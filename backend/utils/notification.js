const admin = require('firebase-admin');

// Function to send notification
const sendNotification = async (recipientToken, message) => {
  try {
    const notificationMessage = {
      notification: {
        title: 'Blood Donation Match',
        body: message
      },
      token: recipientToken
    };

    const response = await admin.messaging().send(notificationMessage);
    console.log('Notification sent successfully:', response);
  } catch (error) {
    console.error('Error sending notification:', error);
  }
};

module.exports = { sendNotification };
