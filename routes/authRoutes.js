const express = require("express");
const router = express.Router();

const {
    register, logout, login, getMe
} = require("../controllers/authController");

const { protect } = require("../middleware/auth");

// Register
router.post("/register", register);

// LogOut
router.post("/logout", logout);

// LogIn
router.post("/login", login);

// Get Current User => harus di protect karena butuh token untuk bisa akses user yang sedang login
router.get("/me", protect, getMe);

module.exports = router;