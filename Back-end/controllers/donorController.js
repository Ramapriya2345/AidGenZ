import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Donor from '../models/donorModel.js';
import DonationItem from '../models/DonationItem.js';
import { uploadToCloudinary } from '../utils/cloudinary.js';
import RequestDonation from '../models/RequestDonation.js';
import Orphanage from '../models/orphanageModel.js';

export const acceptDonationRequest = async (req, res) => {
  try {
    const { id } = req.params;
    const donorId = req.user.donorId; // Get donor ID from authenticated user

    // Find the requested donation
    const donationRequest = await RequestDonation.findById(id);

    if (!donationRequest) {
      return res.status(404).json({ error: "Donation request not found" });
    }

    // Check if the request is already accepted
    if (donationRequest.status === "active" && donationRequest.donorId) {
      return res.status(400).json({ error: "This donation request is already taken by another donor." });
    }

    // Update request with donorId and status
    donationRequest.status = "active";
    donationRequest.donorId = donorId;
    await donationRequest.save();

    // Send success response
    res.status(200).json({ message: "You have successfully accepted this donation request.", donationRequest });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getDonorProfile = async (req, res) => {
  try {
    console.log("Decoded User ID:", req.user.donorId);

    const donorId = req.user.donorId; // Extract donor ID from authenticated request

    // Fetch donor details without password
    const donor = await Donor.findById(donorId).select("-password").lean();

    if (!donor) {
      return res.status(404).json({ message: "Donor not found" });
    }

    // Fetch donations made by this donor
    const donations = await DonationItem.find({ donorId }).lean();

    // Fetch accepted donation requests (where donorId is assigned)
    const acceptedRequests = await RequestDonation.find({ donorId: donorId }).lean();

    // Manually fetch orphanage details for each accepted request
    const orphanageDetails = [];

    // Loop through acceptedRequests to fetch orphanage data
    for (const request of acceptedRequests) {
      const orphanage = await Orphanage.findById(request.orphanageId).select("name phoneNo").lean();
      if (orphanage) {
        orphanageDetails.push({
          orphanageId: orphanage._id,
          name: orphanage.name,
          phoneNo: orphanage.phoneNo,
          itemsNeeded: request.itemNames,
          urgency: request.urgency,
          status: request.status
        });
      }
    }

    // Return donor details, donation items, and accepted requests with orphanage details
    res.status(200).json({
      donor,           // Donor details
      donations,       // Donations made by the donor
      acceptedRequests: orphanageDetails, // Accepted donation requests with orphanage details
    });

  } catch (error) {
    console.error("Error fetching donor profile:", error);
    res.status(500).json({ error: error.message });
  }
};


export const registerDonor = async (req, res) => {
  try {
    console.log("Received data:", req.body);
    console.log("File:", req.file);

    if (!req.file) {
      return res.status(400).json({ message: "Profile image is required" });
    }

    const { name, email, password, location, phoneNo } = req.body;

    // Validate phone number (this can be expanded if needed)
    if (!phoneNo || phoneNo.length !== 10) {
      return res.status(400).json({ message: "A valid 10-digit phone number is required" });
    }

    const existingDonor = await Donor.findOne({ email });
    if (existingDonor) {
      return res.status(400).json({ message: "Email already registered" });
    }

    const uploadResult = await uploadToCloudinary(req.file);
    console.log("Upload result from Cloudinary:", uploadResult);

    const newDonor = new Donor({
      name,
      email,
      password: await bcrypt.hash(password, 10),
      location,
      phoneNo,  // Saving the phone number
      profileImage: uploadResult,
    });

    await newDonor.save();

    res.status(201).json({ message: "Donor registered successfully", donor: newDonor });
  } catch (error) {
    console.error("Error registering donor:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


// Login Donor
export const loginDonor = async (req, res) => {
  try {
    const { email, password } = req.body;

    const donor = await Donor.findOne({ email });
    if (!donor) {
      return res.status(400).json({ success: false, message: "Donor not found" });
    }

    const isMatch = await bcrypt.compare(password, donor.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    }

    const token = jwt.sign({ donorId: donor._id }, process.env.JWT_SECRET, { expiresIn: "1d" });

    res.json({
      success: true,
      message: "Login successful",
      token,
      donor: {
        _id: donor._id,
        name: donor.name,
        email: donor.email,
        location: donor.location,
        profileImage: donor.profileImage
      }
    });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Add Donation Item
export const addDonationItem = async (req, res) => {
  try {
    const { donorId, itemName, quantity, category } = req.body;
    console.log(req.files);

    const imageUrls = [];
    if (req.files && req.files.length > 0) {
      for (let file of req.files) {
        const result = await uploadToCloudinary(file);
        imageUrls.push(result);
      }
    }

    const newDonationItem = new DonationItem({
      donorId,
      itemName,
      quantity,
      category,
      imageUrls,
      status: "pending", // 🔹 Default status when added
      bookedBy: null, // 🔹 No orphanage has booked it yet
    });

    await newDonationItem.save();
    res.status(201).json({ message: "Donation item added successfully", newDonationItem });
  } catch (error) {
    console.error("Error adding donation item:", error);
    res.status(500).json({ error: "Failed to add donation item" });
  }
};


// ✅ Get only the logged-in donor's donations
export const getDonationsList = async (req, res) => {
  try {
    const donorId = req.user.donorId; // Extract donorId from authenticated request

    const donations = await DonationItem.find({ donorId });

    if (!donations.length) {
      return res.status(404).json({ message: "No donations found for this donor." });
    }

    res.status(200).json(donations);
  } catch (error) {
    console.error("Error fetching donor's donations:", error);
    res.status(500).json({ error: "Failed to fetch donations" });
  }
};


// View donations requested by orphanages
export const viewRequestedDonations = async (req, res) => {
  try {
      const orphanageRequests = await RequestDonation.find({ status: "pending" });
      console.log(orphanageRequests);
      const orphanageDetails = []; // Corrected the variable name
      // Loop through orphanageRequests to fetch orphanage data
      for (const request of orphanageRequests) {
        const orphanage = await Orphanage.findById(request.orphanageId).select("name phoneNo location").lean();
        if (orphanage) {
          console.log(orphanage);
          orphanageDetails.push({
            requestId: request._id,
            location: orphanage.location,
            name: orphanage.name,
            phoneNo: orphanage.phoneNo,
            itemsNeeded: request.itemNames,
            urgency: request.urgency,
            status: request.status
          });
        }
      }
      res.status(200).json(orphanageDetails); // Corrected variable name here too
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
};


// Update Donor Profile
export const updateDonorProfile = async (req, res) => {
  const { name, phoneNo, email } = req.body;
  const donorId = req.user.id; // Extracted from authentication middleware

  try {
    const donor = await Donor.findById(donorId);
    if (!donor) {
      return res.status(404).json({ message: "Donor not found" });
    }

    donor.name = name || donor.name;
    donor.phoneNo = phoneNo || donor.phoneNo;
    donor.email = email || donor.email;

    await donor.save();
    res.status(200).json({ message: "Profile updated successfully", donor });
  } catch (error) {
    console.error("Error updating donor profile:", error);
    res.status(500).json({ message: "Error updating profile", error });
  }
};
