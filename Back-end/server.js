import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';

// Import routes
import donorRoutes from './routes/donorRoutes.js';
import orphanageRoutes from './routes/orphanageRoutes.js';
import leaderboardRoutes from './routes/leaderboardRoutes.js';
import donationRoutes from './routes/donationRoutes.js';
import requestDonationRoute from './routes/requestDonationRoute.js';
import forgotPasswordRoute from './routes/forgotPasswordRoute.js';  // Import Forgot Password Route

// Initialize dotenv to load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(express.json());  // for parsing application/json
app.use(cors());  // for enabling cross-origin requests

// Routes
app.use('/api/donations', donationRoutes);
app.use('/api/donor', donorRoutes);
app.use('/api/orphanage', orphanageRoutes);
app.use('/api/leaderboard', leaderboardRoutes);
app.use('/api', requestDonationRoute);
app.use('/api', forgotPasswordRoute); // Add Forgot Password Route

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, { 
  useNewUrlParser: true, 
  useUnifiedTopology: true 
})
  .then(() => console.log('MongoDB Connected'))
  .catch((err) => console.error('MongoDB Error:', err));

// Error handling middleware (to catch 404 errors)
app.use((req, res, next) => {
  const error = new Error('Not Found');
  error.status = 404;
  next(error);
});

// Global error handler middleware
app.use((error, req, res, next) => {
  res.status(error.status || 500).json({
    message: error.message || 'Internal Server Error',
    stack: process.env.NODE_ENV === 'development' ? error.stack : {}
  });
});

// Start server
const PORT = process.env.PORT || 5000;  
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
