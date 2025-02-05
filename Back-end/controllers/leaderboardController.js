// Import models
import Donor from "../models/donorModel.js";

// Get top 10 donors based on points
export const getTopDonors = async (req, res) => {
  try {
    // Fetch top 10 donors, sorted by points in descending order
    const topDonors = await Donor.find()
      .sort({ points: -1 }) // Sort donors by points, in descending order
      .limit(10); // Limit to top 10 donors

    if (topDonors.length === 0) {
      return res.status(404).json({ message: "No top donors found." });
    }

    res.status(200).json(topDonors);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
