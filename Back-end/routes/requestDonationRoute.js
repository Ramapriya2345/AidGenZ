import express from "express";
import { getOrphanageRequests, deleteRequest } from "../controllers/requestDonationController.js"; // Correct imports
import authMiddleware from '../middleware/authOrphanage.js'; // Import the authMiddleware

const router = express.Router();

// ✅ Route to get all requests for the logged-in orphanage
router.get('/requests', authMiddleware, getOrphanageRequests);

// ✅ Route to delete a specific donation request
router.delete('/requests/:requestId', authMiddleware, deleteRequest);

export default router;

