import express from "express";
import { forgotPassword , resetPassword} from "../controllers/forgotPasswordController.js";

const router = express.Router();

// POST - Forgot Password
router.post("/forgot-password", forgotPassword);

// Reset password route with userType as query parameter
router.post("/reset-password/:token", resetPassword);


export default router;
