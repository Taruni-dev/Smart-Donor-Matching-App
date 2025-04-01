const express = require('express');
const router = express.Router();
const BloodInventory = require('../models/BloodInventory'); // Ensure this model exists

// POST route to add blood inventory
router.post('/add', async (req, res) => {
    try {
        const { bloodType, quantity, hospital, city } = req.body;
        if (!bloodType || !quantity || !hospital || !city) {
            return res.status(400).json({ error: "All fields are required" });
        }
        const newStock = new BloodInventory({ bloodType, quantity, hospital, city });
        await newStock.save();
        res.status(201).json({ message: 'Blood stock added successfully', newStock });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
