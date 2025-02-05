import jwt from "jsonwebtoken";

const authOrphanage = (req, res, next) => {
  try {
    const authHeader = req.header("Authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Access denied. No token provided." });
    }

    const token = authHeader.split(" ")[1]; // Extract token after "Bearer"
    
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Ensure decoded payload has an ID
    if (!decoded.id) {
      return res.status(403).json({ message: "Invalid token: Missing orphanage ID" });
    }

    req.user = decoded; // Attach orphanage data to request
    next(); // Move to the next middleware
  } catch (error) {
    console.error("Auth Error:", error.message);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

export default authOrphanage;
