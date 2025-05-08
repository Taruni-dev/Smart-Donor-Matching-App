const { Donor, Recipient } = require('./models');

// Haversine formula to calculate distance
const haversineDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371; // Earth radius in kilometers
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; // Distance in kilometers
};

// Function to find matching donors based on blood type and distance
const findMatchingDonors = async (recipientId) => {
  const recipient = await Recipient.findById(recipientId);

  // Find donors with matching blood type
  const donors = await Donor.find({ bloodType: recipient.bloodType });

  // Filter donors by proximity (within 50 km radius, for example)
  const matchingDonors = donors.filter((donor) => {
    const distance = haversineDistance(
      recipient.location.lat,
      recipient.location.lon,
      donor.location.lat,
      donor.location.lon
    );
    return distance <= 50; // Match if within 50 km radius
  });

  return matchingDonors;
};

module.exports = { findMatchingDonors };
