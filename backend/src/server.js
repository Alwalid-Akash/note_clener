const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
console.log("Current directory:", process.cwd());
console.log("Mongo URL:", process.env.MONGO_URL);
const connectDB = require("./config/db");

const app = express();
app.use(cors());
app.use(express.json());
connectDB();




const PORT = process.env.PORT || 5002;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});