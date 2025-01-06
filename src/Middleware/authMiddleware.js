const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.SECRET_KEY || "your_secret_key";

const verifyToken = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1]; // Extract token from the `Authorization` header

    if (!token) {
        return res.status(401).json({ message: "Access denied, no token provided" });
    }

    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        req.user = decoded; // Attach decoded payload to `req.user`
        next(); // Proceed to the next middleware/route handler
    } catch (error) {
        res.status(403).json({ message: "Invalid or expired token" });
    }
};

module.exports = { verifyToken };
