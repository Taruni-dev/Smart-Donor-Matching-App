const Donor = require("../models/Donor");

// Register a new donor
const register = async (req, res) => {
    try {
        const { name, contact, bloodType, city, availability, fcmToken } = req.body;
        if (!name || !contact || !bloodType || !city || availability === undefined) {
            return res.status(400).json({ message: "All fields are required" });
        }
        const newDonor = new Donor({ name, contact, bloodType, city, availability, fcmToken });
        await newDonor.save();
        res.status(201).json({ message: "Donor registered successfully", newDonor });
    } catch (error) {
        res.status(500).json({ message: "Error registering donor", error: error.message });
    }
};

// Get all donors
const getAllDonors = async (req, res) => {
    try {
        const donors = await Donor.find();
        res.status(200).json(donors);
    } catch (error) {
        res.status(500).json({ message: "Error fetching donors", error: error.message });
    }
};

// Get a donor by ID
const getDonorById = async (req, res) => {
    try {
        const donor = await Donor.findById(req.params.id);
        if (!donor) return res.status(404).json({ message: "Donor not found" });
        res.status(200).json(donor);
    } catch (error) {
        res.status(500).json({ message: "Error fetching donor", error: error.message });
    }
};

// Update a donor
const updateDonor = async (req, res) => {
    try {
        const updatedDonor = await Donor.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedDonor) return res.status(404).json({ message: "Donor not found" });
        res.status(200).json({ message: "Donor updated successfully", updatedDonor });
    } catch (error) {
        res.status(500).json({ message: "Error updating donor", error: error.message });
    }
};

// Delete a donor
const deleteDonor = async (req, res) => {
    try {
        const deletedDonor = await Donor.findByIdAndDelete(req.params.id);
        if (!deletedDonor) return res.status(404).json({ message: "Donor not found" });
        res.status(200).json({ message: "Donor deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting donor", error: error.message });
    }
};

// Match donors based on blood type and city
const matchDonors = async (req, res) => {
    try {
        const { bloodType, city } = req.query;
        const matchedDonors = await Donor.find({ bloodType, city });

        if (matchedDonors.length === 0) return res.status(404).json({ message: "No matching donors found" });

        res.status(200).json(matchedDonors);
    } catch (error) {
        res.status(500).json({ message: "Error finding donors", error: error.message });
    }
};


// Export all functions
module.exports = {
    register,
    getAllDonors,
    getDonorById,
    updateDonor,
    deleteDonor,
    matchDonors
};
