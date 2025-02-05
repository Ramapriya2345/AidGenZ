import express from 'express';
import { upload } from '../utils/cloudinary.js';
import { updateDonorProfile , registerDonor, loginDonor, acceptDonationRequest , addDonationItem , getDonationsList , viewRequestedDonations , getDonorProfile } from '../controllers/donorController.js';
import authMiddleware from '../middleware/authDonor.js'; // Import the authMiddleware

const router = express.Router();

// Donor registration and login
router.post('/register', upload.single('profileImage'), registerDonor); // Upload profile image
router.post('/login', loginDonor);

// Route to create donation list with multiple images (requires authentication)
router.post("/add-donation", authMiddleware, upload.array("itemImages", 5), addDonationItem); // Up to 5 images

//getDonation of particular person
router.get("/get-Donation" , getDonationsList); 

router.get("/profile" , authMiddleware , getDonorProfile);

router.get("/view-request" , authMiddleware , viewRequestedDonations);

router.patch("/accept-request/:id" , authMiddleware , acceptDonationRequest);

router.put("/update-profile", authMiddleware, updateDonorProfile);

export default router;
