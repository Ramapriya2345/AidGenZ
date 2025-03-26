import cloudinary from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import multer from 'multer';
import dotenv from 'dotenv';
import { Readable } from 'stream';

// Load environment variables
dotenv.config();

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Use memory storage to handle file uploads in memory
const storageMulter = multer.memoryStorage();

// Initialize multer with memory storage
const upload = multer({
  storage: storageMulter,
  limits: { fileSize: 10 * 1024 * 1024 }, // Increase limit to 10MB to accommodate PDFs
  fileFilter: (req, file, cb) => {
    // Allow images and PDFs
    if (file.mimetype.startsWith('image/') || 
        file.mimetype === 'application/pdf' || 
        file.mimetype === 'application/msword' || 
        file.mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
      return cb(null, true);
    } else {
      cb(new Error('Only images and document files (PDF, DOC, DOCX) are allowed'));
    }
  }
});

// Upload file to Cloudinary
const uploadToCloudinary = async (file) => {
  try {
    if (!file || !file.buffer) {
      throw new Error("Invalid file buffer");
    }

    console.log("✅ Uploading file to Cloudinary...");
    console.log("🔹 File Buffer Size:", file.buffer.length);
    console.log("🔹 File Type:", file.mimetype);

    // Convert buffer to base64
    const base64Data = `data:${file.mimetype};base64,${file.buffer.toString('base64')}`;
    
    // Determine resource type based on mimetype
    const resourceType = file.mimetype.startsWith('image/') ? 'image' : 'raw';

    // Upload to Cloudinary
    const result = await cloudinary.uploader.upload(base64Data, {
      folder: 'donation-system',
      resource_type: resourceType,
    });

    console.log("✅ Cloudinary Upload Success:", result.secure_url);
    return result.secure_url;
  } catch (error) {
    console.error("❌ Cloudinary Upload Error:", error);
    throw error;
  }
};

export { upload, uploadToCloudinary };
