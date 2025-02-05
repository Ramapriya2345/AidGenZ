import mongoose from "mongoose";

const LeaderboardSchema = new mongoose.Schema({
    donorId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    points: { type: Number, default: 0 }
}, { timestamps: true });

export default mongoose.model("Leaderboard", LeaderboardSchema);
