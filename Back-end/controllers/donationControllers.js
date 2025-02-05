// controllers/donationController.js
import DonationItem from '../models/DonationItem.js';

// Get donation details by ID
export const getDonationDetails = async (req, res) => {
  const { donationId } = req.params;  // Extract donationId from the URL params

  try {
    // Fetch the donation item by donationId
    const donation = await DonationItem.findById(donationId)
      .populate('donorId', 'name email')  // Populating donor info
      .populate('bookedBy', 'name location');  // Populating orphanage info (if booked)

    if (!donation) {
      return res.status(404).json({ message: 'Donation item not found' });
    }

    res.status(200).json(donation);  // Return the donation details
  } catch (error) {
    console.error('Error fetching donation item:', error);
    res.status(500).json({ message: 'Error fetching donation item', error });
  }
};

// Delete a donation item
export const deleteDonationItem = async (req, res) => {
  const { donationId } = req.params;
  try {
    const donation = await DonationItem.findById(donationId);
    if (!donation) {
      return res.status(404).json({ message: "Donation item not found" });
    }

    await DonationItem.findByIdAndDelete(donationId);
    res.status(200).json({ message: "Donation item deleted successfully" });
  } catch (error) {
    console.error("Error deleting donation item:", error);
    res.status(500).json({ message: "Error deleting donation item", error });
  }
};
