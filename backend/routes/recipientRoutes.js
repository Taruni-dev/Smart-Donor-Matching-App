const express = require('express');
const router = express.Router();
const Donor = require('../models/Donor'); // Adjust path if needed
const { sendNotification } = require('../utils/notification');

// Blood type compatibility map
const compatibilityMap = {
    'A+': ['A+', 'A-', 'O+', 'O-'],
    'A-': ['A-', 'O-'],
    'B+': ['B+', 'B-', 'O+', 'O-'],
    'B-': ['B-', 'O-'],
    'AB+': ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
    'AB-': ['A-', 'B-', 'AB-', 'O-'],
    'O+': ['O+', 'O-'],
    'O-': ['O-'],
};

// Route to find compatible donors
router.post('/match-donors', async (req, res) => {
    try {
        const { recipientBloodType, city } = req.body;
        if (!recipientBloodType || !city) {
            return res.status(400).json({ message: 'Missing blood type or city' });
        }

        const compatibleBloodTypes = compatibilityMap[recipientBloodType];
        const donors = await Donor.find({
            bloodType: { $in: compatibleBloodTypes },
            city: city,
        });

        // Send notifications to recipients
        donors.forEach(async (donor) => {
            const recipientToken = donor.recipientDeviceToken;  // Ensure you store the recipient's device token somewhere
            const message = `We found a matching donor: ${donor.name} with blood type ${donor.bloodType}.`;
            await sendNotification(recipientToken, message);
        });

        res.status(200).json({ donors });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
