import RequestDonation from "../models/RequestDonation.js";
import bcrypt from "bcryptjs";
import Orphanage from "../models/orphanageModel.js";
import DonationItem from "../models/DonationItem.js"; // Import DonationItem for available donations
import jwt from "jsonwebtoken";
import { uploadToCloudinary } from "../utils/cloudinary.js";
import Donor from "../models/donorModel.js";
import sendWhatsAppMessage from '../utils/sendMessage.js';

export const registerOrphanage = async (req, res) => {
  try {
    const { name, email, password, location, phoneNo } = req.body;
    const images = req.files; // Access all uploaded files as an array

    // Validate phone number
    if (!phoneNo || phoneNo.length !== 10) {
      return res
        .status(400)
        .json({ message: "A valid 10-digit phone number is required" });
    }

    // Check if orphanage with this email already exists
    const existingOrphanage = await Orphanage.findOne({ email });
    if (existingOrphanage) {
      return res.status(400).json({ message: "Email already registered" });
    }

    // Extract profile image and proof from the images array
    const profileImage = images[0]; // Profile image at index 0
    const proof = images[1]; // Proof image at index 1

    console.log("Profile Image: ", profileImage);
    console.log("Proof Image: ", proof);

    let profileImageUrl = "";
    let proofImageUrl = "";

    // Upload profile image to Cloudinary if it exists
    if (profileImage) {
      const uploadResult = await uploadToCloudinary(profileImage);
      profileImageUrl = uploadResult;
    }

    // Upload proof image to Cloudinary if it exists
    if (proof) {
      const proofUploadResult = await uploadToCloudinary(proof);
      proofImageUrl = proofUploadResult;
    }

    console.log("Uploaded Profile Image URL: ", profileImageUrl);
    console.log("Uploaded Proof Image URL: ", proofImageUrl);

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new orphanage
    const orphanage = new Orphanage({
      name,
      email,
      password: hashedPassword,
      location,
      phoneNo,
      profileImage: profileImageUrl,
      proof: proofImageUrl,
    });

    await orphanage.save();
    res.status(201).json({ message: "Orphanage registered successfully" });
  } catch (error) {
    console.error("Error registering orphanage: ", error);
    res.status(500).json({ error: error.message });
  }
};

export const loginOrphanage = async (req, res) => {
  const { email, password } = req.body;

  // Check if the orphanage exists with the given email
  const orphanage = await Orphanage.findOne({ email });

  if (!orphanage) {
    return res
      .status(404)
      .json({ message: "Orphanage not found with this email" });
  }

  // Check if the provided password matches the stored password
  const isMatch = await bcrypt.compare(password, orphanage.password);
  if (!isMatch) {
    return res
      .status(400)
      .json({ message: "Invalid credentials. Please check your password" });
  }

  // Generate a JWT token for the orphanage login session
  const token = jwt.sign({ id: orphanage._id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

  res.json({ message: "Login successful", token, orphanage });
};

export const requestDonation = async (req, res) => {
  try {
    const { items, urgency } = req.body;
    const orphanageId = req.user.id;

    // Fetch orphanage details to get phone number
    const orphanage = await Orphanage.findById(orphanageId).select("phoneNo name");

    if (!orphanage) {
      return res.status(404).json({ error: "Orphanage not found" });
    }

    // Create the donation request
    const donationRequest = new RequestDonation({
      orphanageId,
      itemNames: items,
      urgency,
      status: "pending",
    });

    await donationRequest.save();

    // If urgency is 'urgent' or 'moderate', notify donors
    if (urgency === "urgent" || urgency === "moderate") {
      const donors = await Donor.find({}, "phoneNo"); // Fetch all donors' phone numbers

      if (donors.length > 0) {
        const message = `🔔 *Urgent Donation Request!* 🔔
        
🏠 *Orphanage Name:* ${orphanage.name}

📌 *Requested Items:* ${items.join(", ")}

📞 *Contact:* +91${orphanage.phoneNo}

⚡ *Urgency Level:* ${urgency.toUpperCase()}

🔗 *Click here to respond:* 
👉 *View Request :* http://localhost:3000/requested-donations

🙏 Thank you for your kindness! ❤️`;

        // Sending WhatsApp messages to all donors
        for (const donor of donors) {
          await sendWhatsAppMessage(`+91${donor.phoneNo}`, message);
        }
      }
    }

    res.status(201).json({ message: "Donation request created successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// View available donations for orphanages
export const getAvailableDonations = async (req, res) => {
  try {
    console.log("Okay");
    const donations = await DonationItem.find({ status: "pending" });
    res.status(200).json(donations);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getProfileOrphanage = async (req, res) => {
  try {
    // Get the orphanage ID from the decoded user token
    const decoded = req.user.id;

    // Fetch orphanage profile excluding the password
    const orphanage = await Orphanage.findById(decoded).select("-password");

    if (!orphanage) {
      return res.status(404).json({ message: "Orphanage not found" });
    }

    // Fetch active donations for this orphanage
    const activeDonations = await DonationItem.find({
      bookedBy: orphanage._id,
      status: 'active', // Only get active donations
    });

    // Send the orphanage profile and active donations in the response
    res.status(200).json({
      orphanage,
      activeDonations, // Include active donations in the response
    });
  } catch (error) {
    console.error("Error fetching orphanage profile:", error);
    res.status(500).json({ error: error.message });
  }
};


export const getDonorProfile = async (req, res) => {
  try {

    const donorId = req.params.donorId; // Extract donor ID from the authenticated request
    const donor = await Donor.findById(donorId)
      .select("-password") // Don't return password
      .lean(); // Convert to plain JavaScript object

    if (!donor) {
      return res.status(404).json({ message: "Donor not found" });
    }

    // Fetch donations made by this donor
    const donations = await DonationItem.find({ donorId }).lean();

    res.status(200).json({
      ...donor,
      donations, // Add donations to the response
    });
  } catch (error) {
    console.error("Error fetching donor profile:", error);
    res.status(500).json({ error: error.message });
  }
};

export const acceptDonation = async (req, res) => {
  const { donationId } = req.params;
  const orphanageId = req.user.id; // Orphanage ID from the logged-in user

  try {
      // Fetch orphanage details
      console.log('Fetching orphanage details...');
      const orphanage = await Orphanage.findById(orphanageId);
      if (!orphanage || !orphanage.phoneNo) {
          console.log('Orphanage not found or missing phone number');
          return res.status(404).json({ message: "Orphanage not found or missing phone number" });
      }
      const orphanagePhone = orphanage.phoneNo; // Extract phone number
      console.log(`Orphanage phone number: ${orphanagePhone}`);

      // Fetch donation details
      console.log('Fetching donation details...');
      const donation = await DonationItem.findById(donationId);
      if (!donation) {
          console.log('Donation not found');
          return res.status(404).json({ message: "Donation not found" });
      }

      if (donation.status === "fulfilled") {
          console.log('Donation already fulfilled');
          return res.status(400).json({ message: "This donation has already been fulfilled" });
      }

      // Update donation status & assign orphanage
      console.log('Updating donation status and assigning orphanage...');
      donation.status = "active";
      donation.bookedBy = orphanageId;
      await donation.save();

      // Fetch donor details
      console.log('Fetching donor details...');
      const donor = await Donor.findById(donation.donorId);
      if (!donor || !donor.phoneNo) {
          console.log('Donor not found or missing phone number');
          return res.status(404).json({ message: "Donor not found or missing phone number" });
      }

      // Ensure phone numbers include country code
      const formattedOrphanagePhone = `+91${orphanagePhone}`;  // Prepending +91 to orphanage phone number
      const formattedDonorPhone = `+91${donor.phoneNo}`;  // Prepending +91 to donor phone number

      console.log(`Formatted Donor Phone: ${formattedDonorPhone}`);
      console.log(`Formatted Orphanage Phone: ${formattedOrphanagePhone}`);
      
      // Send orphanage contact info to the donor
      const message = `Hello! The orphanage (${formattedOrphanagePhone}) has accepted your donation of ${donation.itemName}. Please contact them directly.`;
      console.log(`Sending message to donor: ${message}`);
      const response = await sendWhatsAppMessage(formattedDonorPhone, message);

      console.log(`Response SID from Twilio: ${response}`);

      res.status(200).json({ message: "Donation accepted and WhatsApp message sent!", donation });

  } catch (error) {
      console.error("Error accepting donation:", error);
      res.status(500).json({ error: error.message });
  }
};


// Function to complete a donation and add ratings/comments
export const completeDonation = async (req, res) => {
  const { donationId } = req.params;
  const { rating, comment } = req.body;  // Get rating and comment from the request body
  const orphanageId = req.user.id;

  try {
    // Fetch donation details
    const donation = await DonationItem.findById(donationId);
    if (!donation) {
      return res.status(404).json({ message: "Donation not found" });
    }

    // Check if the orphanage is the one that accepted the donation
    if (donation.bookedBy.toString() !== orphanageId) {
      return res.status(403).json({ message: "You are not authorized to complete this donation" });
    }

    // Check if donation status is active
    if (donation.status !== 'active') {
      return res.status(400).json({ message: "Donation is not active" });
    }

    // Update donation status to fulfilled
    donation.status = 'fulfilled';

    // Add the rating to the donation (overwrite it or add logic for average rating if needed)
    donation.rating = rating;

    // Add the comment to the donation's comments array
    donation.comment = comment;
    donation.date = new Date();
    // Save the donation with updated status, rating, and comments
    await donation.save();

    // Fetch donor details and add credits
    const donor = await Donor.findById(donation.donorId);
    if (!donor) {
      return res.status(404).json({ message: "Donor not found" });
    }

    // Add credits to the donor's account (adjust based on your credit system)
    donor.points += 10;  // Example: adding 10 credits
    await donor.save();

    res.status(200).json({ message: "Donation completed, rating and comments added, credits added to donor" });
  } catch (error) {
    console.error("Error completing donation:", error);
    res.status(500).json({ error: error.message });
  }
};

// Update Orphanage Profile
export const updateOrphanageProfile = async (req, res) => {
  const { name, phoneNo, email } = req.body;
  const orphanageId = req.user.id; // Extracted from authentication middleware

  try {
    const orphanage = await Orphanage.findById(orphanageId);
    if (!orphanage) {
      return res.status(404).json({ message: "Orphanage not found" });
    }

    orphanage.name = name || orphanage.name;
    orphanage.phoneNo = phoneNo || orphanage.phoneNo;
    orphanage.email = email || orphanage.email;

    await orphanage.save();
    res.status(200).json({ message: "Profile updated successfully", orphanage });
  } catch (error) {
    console.error("Error updating orphanage profile:", error);
    res.status(500).json({ message: "Error updating profile", error });
  }
};

