// backend/src/routes/passwordRoutes.js
const express = require("express");
const router = express.Router();
const { forgotPassword, resetPassword } = require("../controllers/passwordController.js");

// Make sure the functions are defined
console.log("📦 Imported controllers:", { forgotPassword: !!forgotPassword, resetPassword: !!resetPassword });

// ✅ These routes should work
router.post("/forgot", forgotPassword);
router.post("/reset/:token", resetPassword);

module.exports = router;