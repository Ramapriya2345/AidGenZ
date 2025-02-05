import express from "express";
import { getTopDonors } from "../controllers/leaderboardController.js";  // Correct import

const router = express.Router();

// Route to get leaderboard (top donors)
router.get("/top-donors", getTopDonors);

export default router;
