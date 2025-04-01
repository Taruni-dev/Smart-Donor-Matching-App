const express = require('express');
const router = express.Router();
const BloodRequest = require('../models/BloodRequest');
const matchDonors = require('../utils/matchDonors');

// POST route to create a blood request and find donors
router.post('/request', async (req, res) => {
    try {
        const { name, contact, bloodType, unitsRequired, hospital, city } = req.body;
        if (!name || !contact || !bloodType || !unitsRequired || !hospital || !city) {
            return res.status(400).json({ error: "All fields are required" });
        }

        // Create new blood request
        const newRequest = new BloodRequest({ name, contact, bloodType, unitsRequired, hospital, city });
        await newRequest.save();

        // Find matching donors
        const donors = await matchDonors(bloodType, city);

        res.status(201).json({
            message: 'Blood request created successfully',
            newRequest,
            matchingDonors: donors
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
