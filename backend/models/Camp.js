const mongoose = require('mongoose');

const campSchema = new mongoose.Schema({
  name: String,
  location: String,  // e.g., "Addanki"
  address: String,
  date: String,
  time: String,
});

module.exports = mongoose.model('Camp', campSchema);
