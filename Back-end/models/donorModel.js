import mongoose from 'mongoose';

const donorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
  },
  location: {
    type: String,
    required: [true, 'Location is required'],
  },
  profileImage: {
    type: String,
  },
  points: {
    type: Number,
    default: 0,  // Initial points set to 0
  },
  phoneNo: { 
    type: String, 
    required: true, 
    unique: true, 
    match: [/^\d{10}$/, 'Please enter a valid 10-digit phone number'] // Validates a 10-digit phone number
  },

  // Fields for password reset functionality
  resetPasswordToken: String,        // Token for resetting password
  resetPasswordExpires: Date,        // Expiry date for the reset token

});

const Donor = mongoose.model('Donor', donorSchema);
export default Donor;
