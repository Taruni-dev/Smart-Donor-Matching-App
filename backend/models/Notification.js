const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  message: String,
  donor: {
    name: String,
    phone: String,
    lastDonation: String,
  },
});

module.exports = mongoose.model('Notification', notificationSchema, 'notifications');
