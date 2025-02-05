import mongoose from "mongoose";

const RequestDonationSchema = new mongoose.Schema(
  {
    orphanageId: { type: mongoose.Schema.Types.ObjectId, ref: "orphanageModel" },
    donorId: { type: mongoose.Schema.Types.ObjectId, ref: "Donor", default: null }, // Added donor reference
    itemNames: [{ type: String }], // Array of item names
    urgency: { type: String, enum: ["urgent", "moderate", "low"] },
    status: { type: String, enum: ["pending", "active", "fulfilled"], default: "pending" },
  },
  { timestamps: true }
);

export default mongoose.model("RequestDonation", RequestDonationSchema);
