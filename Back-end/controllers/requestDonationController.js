import RequestDonation from '../models/RequestDonation.js';
// Get all donation requests for a specific orphanage
export const getOrphanageRequests = async (req, res) => {
  try {
    const orphanageId = req.user.id; // Assuming orphanage ID is available in req.user
    console.log(orphanageId);
    const requests = await RequestDonation.find({ orphanageId: orphanageId });
    res.status(200).json({ success: true, requests });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// Delete a specific donation request
export const deleteRequest = async (req, res) => {
  try {
    const { requestId } = req.params;
    const deletedRequest = await RequestDonation.findByIdAndDelete(requestId);

    if (!deletedRequest) {
      return res.status(404).json({ success: false, message: 'Request not found' });
    }

    res.status(200).json({ success: true, message: 'Request deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};


