import jwt from "jsonwebtoken";

const authDonor = (req, res, next) => {
  try {
    const authHeader = req.header("Authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Access denied. No token provided." });
    }

    const token = authHeader.split(" ")[1]; // Extract token after "Bearer"
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded.donorId);    
    
    // Ensure decoded payload has an ID
    if (!decoded.donorId) {
      return res.status(403).json({ message: "Invalid token: Missing user ID" });
    }

    req.user = decoded; // Attach user data to request
    next(); // Move to the next middleware
  } catch (error) {
    console.error("Auth Error:", error.message);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

export default authDonor;
