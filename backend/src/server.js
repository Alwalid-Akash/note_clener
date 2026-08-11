const express = require("express");
const connectDB = require("./config/db.js");
require("dotenv").config();

const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const noteRoutes = require("./routes/noteRoutes");

//const errorHandler = require("./middleware/errorMiddleware.js");


const app = express();


// CORS
app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://note-clener.vercel.app"   // ✅ no trailing slash
  ],
  credentials: true
}));


app.use(express.json());


// Database
connectDB();


// Routes
app.use("/api/auth", authRoutes);

app.use("/api/notes", noteRoutes);


// Error middleware



const PORT = process.env.PORT || 5000;


app.listen(PORT, () => {

  console.log(
    `server is connected at port: ${PORT}`
  );

});