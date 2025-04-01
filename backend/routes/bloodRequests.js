const express = require('express');
const router = express.Router();
const BloodRequest = require('../models/BloodRequest'); // Ensure correct path

// Your GET request implementation
router.get('/blood-requests', async (req, res) => {
    try {
        const { bloodType, location, status } = req.query;
        let query = {};

        if (bloodType) query.bloodType = bloodType;
        if (location) query.city = location;  // Ensure 'city' is correct
        if (status) query.status = status;

        const requests = await BloodRequest.find(query);
        res.json(requests);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
