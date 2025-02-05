import express from "express";
import { getDonationDetails, deleteDonationItem } from "../controllers/donationControllers.js";
import authMiddleware from "../middleware/authDonor.js";

const router = express.Router();

router.get("/:donationId", getDonationDetails);
router.delete("/delete-donation/:donationId", authMiddleware, deleteDonationItem);

export default router;
