import mongoose from 'mongoose';

const donationSchema = new mongoose.Schema({
  donorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Donor', required: true },
  itemName: { type: String, required: true },
  quantity: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Donation = mongoose.model('Donation', donationSchema);
export default Donation; 