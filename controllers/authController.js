const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/Users");

// Generate JWT Token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: "2m",
    });
};

// Set Token in HTTP-only Cookie
const setTokenCookie = (res, token) => {
    res.cookie("token", token, {
        httpOnly: true,
        sameSite: "strict",
        maxAge:  120000, // 2 minutes (in ms)
    })
};

// Register User
const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Check if user already exists
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(409).json({ message: "User already exists" });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10); // Generate salt within 2^10 rounds
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create user
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
        });

        // Generate and set token
        const token = generateToken(user._id);
        setTokenCookie(res, token);

        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email
        });

    } catch (error) {
        res.status(400).json({ message: error.message });
    }

}

// LogOut
const logout = (req, res) => {
    res.clearCookie("token");
    res.json({ message: "Logged out successfully" });
}

// LogIn
const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        // Check password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        // Generate and set token
        const token = generateToken(user._id);
        setTokenCookie(res, token);

        res.json({
            _id: user._id,
            name: user.name,
            email: user.email
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get Current User
const getMe = async (req, res) => {
    res.json({
        _id: req.user._id,
        name: req.user.name,
        email: req.user.email,
        role: req.user.role,
        createdAt: req.user.createdAt
    });
}

module.exports = { register, logout, login, getMe };