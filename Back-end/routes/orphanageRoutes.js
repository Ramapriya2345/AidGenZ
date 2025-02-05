import express from "express";
import {
  requestDonation,
  getAvailableDonations,
  getProfileOrphanage,
  getDonorProfile,
  acceptDonation,
  completeDonation, // Import the completeDonation controller
  updateOrphanageProfile,
} from "../controllers/orphanageController.js"; // Correct imports
import { upload } from '../utils/cloudinary.js'; // Adjust this path if necessary
import { registerOrphanage, loginOrphanage } from '../controllers/orphanageController.js';
import authMiddleware from '../middleware/authOrphanage.js'; // Import the authMiddleware

const router = express.Router();

// Orphanage registration and login
router.post('/register', upload.array("images", 2), registerOrphanage);
router.post('/login', loginOrphanage);

// Route to request donation (requires authentication)
router.post("/request-donation", authMiddleware, requestDonation);

// Route to view available donations (requires authentication)
router.get("/available-donations", authMiddleware , getAvailableDonations);

// Route to accept a donation (requires authentication)
router.put("/accept-donation/:donationId", authMiddleware, acceptDonation); // New route for accepting donations

// Route to fetch orphanage profile (requires authentication)
router.get("/profile", authMiddleware , getProfileOrphanage);

// Route to fetch donor profile (requires authentication)
router.get("/:donorId", authMiddleware, getDonorProfile);

// Route to complete a donation (requires authentication) - PATCH for updating donation status
router.patch("/complete/:donationId", authMiddleware , completeDonation); // Updated to PATCH for completing donation

router.put("/update-profile", authMiddleware, updateOrphanageProfile);


export default router;
