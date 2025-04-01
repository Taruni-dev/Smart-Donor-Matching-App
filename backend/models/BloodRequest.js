const mongoose = require('mongoose');

const BloodRequestSchema = new mongoose.Schema({
    name: String,
    contact: String,
    bloodType: String,
    unitsRequired: Number,
    hospital: String,
    city: String,
    status: { type: String, default: "Pending" }
});

module.exports = mongoose.model('BloodRequest', BloodRequestSchema);
