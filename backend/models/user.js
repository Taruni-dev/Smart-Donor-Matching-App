const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  phone: String,
  location: String,
  bloodGroup: String,
  date: Date
});

module.exports = mongoose.model('User', userSchema);
