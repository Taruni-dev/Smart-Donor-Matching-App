const mongoose = require('mongoose');

const DonorSchema = new mongoose.Schema({
    name: { type: String, required: true },
    contact: { type: String, required: true },
    bloodType: { type: String, required: true },
    city: { type: String, required: true },
    availability: { type: Boolean, required: true },
    fcmToken: { type: String }
});

module.exports = mongoose.model('Donor', DonorSchema);
