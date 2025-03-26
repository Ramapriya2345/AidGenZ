import express from "express";
import { getTopDonors } from "../controllers/leaderboardController.js";
const router = express.Router();

// Route to view available donations (requires authentication)
router.get("/top-donors" , getTopDonors);

export default router;
