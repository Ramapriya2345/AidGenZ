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
  limits: { fileSize: 5 * 1024 * 1024 }, // Limit file size to 5MB
  fileFilter: (req, file, cb) => {
    const allowedFileTypes = /jpeg|jpg|png|gif/;
    const extname = allowedFileTypes.test(file.originalname.toLowerCase());
    const mimetype = allowedFileTypes.test(file.mimetype);

    if (extname && mimetype) {
      return cb(null, true);
    } else {
      cb(new Error('Only images are allowed'));
    }
  }
});



// Upload image to Cloudinary
const uploadToCloudinary = async (file) => {
  try {
    if (!file || !file.buffer) {
      throw new Error("Invalid file buffer");
    }

    console.log("✅ Uploading file to Cloudinary...");
    console.log("🔹 File Buffer Size:", file.buffer.length);

    // Convert buffer to base64 (Cloudinary supports direct upload via base64)
    const base64Image = `data:${file.mimetype};base64,${file.buffer.toString('base64')}`;

    // Upload directly to Cloudinary (not using upload_stream)
    const result = await cloudinary.uploader.upload(base64Image, {
      folder: 'donation-system',
      resource_type: 'image',
    });

    console.log("✅ Cloudinary Upload Success:", result.secure_url);
    return result.secure_url;
  } catch (error) {
    console.error("❌ Cloudinary Upload Error:", error);
    throw error;
  }
};

export { upload, uploadToCloudinary };
