const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  phone: String,
  location: String,
  bloodGroup: String,
  date: Date,
    donationCount: {
    type: Number,
    default: 0
    },
});

module.exports = mongoose.model('User', userSchema);
