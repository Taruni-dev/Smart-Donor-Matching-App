const matchDonors = async (bloodType, city) => {
    try {
        return await Donor.find({ bloodType, city });
    } catch (error) {
        console.error("Error finding donors:", error);
        throw new Error("Failed to fetch donors");
    }
};
