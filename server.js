const express = require("express");
const cors = require("cors");
const app = express();
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/authRoutes");
const PORT = process.env.PORT || 3002;

dotenv.config();

app.use(cors({
  origin: "http://localhost:5173", // ganti sesuai domain frontend
  credentials: true,
}));

app.use(express.json());
app.use(cookieParser());

// Call the Database
connectDB();

// Endpoint home - Health Check
app.get("/", (req, res) => {
  res.send({ message: "Ticketing Site API Is Running!" });
});

app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
  console.log("Port is running on ", PORT);
});
