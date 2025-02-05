import mongoose from 'mongoose';

const orphanageSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  location: { type: String, required: true },
  profileImage: { type: String },
  proof: { type: String },
  phoneNo: { 
    type: String, 
    required: true, 
    unique: true, 
    match: [/^\d{10}$/, 'Please enter a valid 10-digit phone number'] // Validates a 10-digit phone number
  },
  
  // Fields for password reset functionality
  resetPasswordToken: String,        // Token for resetting password
  resetPasswordExpires: Date,        // Expiry date for the reset token

}, { timestamps: true });

const Orphanage = mongoose.model('Orphanage', orphanageSchema);

export default Orphanage;
