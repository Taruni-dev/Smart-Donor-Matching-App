const mongoose = require('mongoose');

const BloodInventorySchema = new mongoose.Schema({
    bloodType: { type: String, required: true },
    quantity: { type: Number, required: true },
    hospital: { type: String, required: true },
    city: { type: String, required: true }
});

module.exports = mongoose.model('BloodInventory', BloodInventorySchema);
