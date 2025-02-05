import mongoose from "mongoose";

const DonationItemSchema = new mongoose.Schema(
  {
    donorId: { type: mongoose.Schema.Types.ObjectId, ref: "Donor", required: true },
    itemName: { type: String, required: true },
    quantity: { type: Number, required: true },
    category: { type: String, required: true },
    imageUrls: { type: [String] }, // 🔹 Multiple images support
    status: {
      type: String,
      enum: ["pending", "active", "fulfilled"], // 🔹 Only these three statuses allowed
      default: "pending", // 🔹 Default to pending
    },
    bookedBy: { type: mongoose.Schema.Types.ObjectId, ref: "Orphanage", default: null }, // 🔹 Stores which orphanage booked it
    rating: {
      type: Number, // Rating should be a single number (e.g., 1-5)
      min: 1,
      max: 5,
      default: null, // Default to null if no rating has been given yet
    },
    comment: { type: String },  // The comment text
    date: { type: Date, default: Date.now },  // Timestamp when the comment was made
  },
  { timestamps: true }
);

export default mongoose.model("DonationItem", DonationItemSchema);
