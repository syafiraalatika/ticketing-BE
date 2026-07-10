const express = require("express");
const router = express.Router();
const { getDashboardStats } = require("../controllers/adminController");
const { getAllBookings } = require("../controllers/bookingController");
const { protect, requireAdmin } = require("../middleware/auth");

router.use(protect, requireAdmin);

router.get("/stats", getDashboardStats);
router.get("/bookings", getAllBookings);

module.exports = router;