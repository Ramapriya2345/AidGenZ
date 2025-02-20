import express from "express";
import Donor from '../models/donorModel.js';
import Donation from '../models/donationModel.js';

const router = express.Router();

// Route to get leaderboard (top donors)
router.get("/top-donors", async (req, res) => {
  try {
    // Aggregate donations to get total donations and impact score for each donor
    const topDonors = await Donation.aggregate([
      {
        $group: {
          _id: '$donorId',
          totalDonations: { $sum: 1 },
          impactScore: { $sum: '$quantity' }
        }
      },
      // Look up donor details
      {
        $lookup: {
          from: 'donors',
          localField: '_id',
          foreignField: '_id',
          as: 'donorInfo'
        }
      },
      // Unwind the donor info array
      {
        $unwind: '$donorInfo'
      },
      // Project the final format
      {
        $project: {
          _id: 1,
          name: '$donorInfo.name',
          email: '$donorInfo.email',
          location: '$donorInfo.location',
          avatar: '$donorInfo.avatar',
          phone: '$donorInfo.phone',
          totalDonations: 1,
          impactScore: 1
        }
      },
      // Sort by impact score
      {
        $sort: { impactScore: -1 }
      },
      // Limit to top 10
      {
        $limit: 10
      }
    ]);

    res.json(topDonors);
  } catch (error) {
    console.error('Error fetching top donors:', error);
    res.status(500).json({ message: 'Error fetching top donors' });
  }
});

export default router;
