require("dotenv").config();

const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db.js");
const authRoutes = require("./routes/authRoutes");
const noteRoutes = require("./routes/noteRoutes");
const passwordRoutes = require("./routes/passwordRoutes");

// const errorHandler = require("./middleware/errorMiddleware.js");

const app = express();

// CORS Configuration
const allowedOrigins = [
  "http://localhost:5173",
  "https://note-clener.vercel.app",
  "http://localhost",
  "http://localhost:80",
  "http://127.0.0.1",
  process.env.FRONTEND_URL // Optional: set in .env for Docker
].filter(Boolean);

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.warn(`CORS blocked origin: ${origin}`);
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());

// Database
connectDB();

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/notes", noteRoutes);
app.use("/api/password", passwordRoutes);

// Health check
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "OK",
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || "development"
  });
});

// Error middleware
// app.use(errorHandler);

const PORT = process.env.PORT || 5002;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
  console.log("CORS allowed origins:", allowedOrigins);
});