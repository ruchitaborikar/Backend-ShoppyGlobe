// import User from "../models/User.js";
// import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";

// export const register = async (req, res) => {
//     const hashedPassword = await bcrypt.hash(req.body.password, 10);
//     const user = await User.create({ ...req.body, password: hashedPassword });
//     res.json(user);
// };

// export const login = async (req, res) => {
//     const user = await User.findOne({ email: req.body.email });
//     if (!user || !(await bcrypt.compare(req.body.password, user.password))) {
//         return res.status(400).json({ error: "Invalid credentials" });
//     }
//     const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
//     res.json({ token });
// };
// authController.js (or your registration controller file)
import bcrypt from "bcryptjs";
import User from "../models/User.js";
import jwt from "jsonwebtoken";

// Register Controller
export const register = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: "User already exists" });
        }

        // Hash the password before saving it
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create and save the new user
        const user = new User({ username, email, password: hashedPassword });
        await user.save();

        // Return success response
        res.status(201).json({
            message: "User registered successfully",
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
            },
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
};

// Login Controller
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find the user by email
        const user = await User.findOne({ email });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(400).json({ error: "Invalid credentials" });
        }

        // Generate a JWT token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "1h", // Token expires in 1 hour
        });

        // Send back the token
        res.json({
            message: "Login successful",
            token,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
};





