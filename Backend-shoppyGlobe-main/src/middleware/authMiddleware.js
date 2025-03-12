import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
    // Get token from the Authorization header
    const token = req.headers.authorization?.split(" ")[1];
    
    if (!token) {
        return res.status(401).json({ error: "Unauthorized" });
    }

    try {
        // Verify the token using the secret from environment variables
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Attach the user data (or any other info from the decoded token) to req.user
        req.user = decoded;

        // Log the successful verification for debugging (optional)
        console.log("Token verified:", req.user);

        next(); // Proceed to the next middleware or route handler
    } catch (error) {
        // Handle invalid token or expired token
        console.error("Token verification failed:", error.message);
        res.status(401).json({ error: "Invalid token" });
    }
};

export default authMiddleware;
