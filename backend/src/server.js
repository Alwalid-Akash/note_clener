const express = require("express");
const connectDB = require("./config/db.js")
require("dotenv").config()
const cors = require("cors");
const noteRoutes = require("./routes/noteRoutes");
const errorHandler = require("./middleware/errorMiddleware");
const app = express()



connectDB()

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/notes", noteRoutes);

// Error middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`server is connected at port: ${PORT}`)
})