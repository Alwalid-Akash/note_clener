const crypto = require("crypto");
const User = require("../models/User");
const sendEmail = require("../utils/sendEmail");
const bcrypt = require("bcrypt");

// FORGOT PASSWORD
exports.forgotPassword = async (req, res, next) => {
  console.log("🚀 Forgot password function called");

  try {
    const { email } = req.body;
    console.log("📧 Email received:", email);

    if (!email) {
      console.log("❌ No email provided");
      return res.status(400).json({
        message: "Email is required"
      });
    }

    console.log("🔍 Searching for user...");
    const user = await User.findOne({ email });
    console.log("👤 User found:", user ? "Yes" : "No");

    // Don't reveal whether email exists
    if (!user) {
      console.log("❌ User not found, but sending generic message");
      return res.json({
        message: "If an account exists with this email, a reset link has been sent."
      });
    }

    console.log("🔑 Generating reset token...");
    const resetToken = crypto.randomBytes(32).toString("hex");
    console.log("🔑 Reset token generated");

    // Store hashed token in database
    user.resetPasswordToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    // Token valid for 15 minutes
    user.resetPasswordExpires = Date.now() + 15 * 60 * 1000;

    console.log("💾 Saving user with reset token...");
    await user.save();
    console.log("✅ User saved successfully");

    const resetUrl = `${process.env.FRONTEND_URL || "http://localhost:5173"}/reset-password/${resetToken}`;
    console.log("🔗 Reset URL:", resetUrl);

    try {
      // Try to send email
      console.log("📧 Sending email...");
      await sendEmail({
        to: user.email,
        subject: "Reset your Notes App password",
        text: `Click this link to reset your password: ${resetUrl}`
      });
      console.log("✅ Email sent successfully");

      res.json({
        message: "If an account exists with this email, a reset link has been sent."
      });

    } catch (emailError) {
      // If email fails, still return success but log the error
      console.error("❌ Email sending failed, but user was saved:", emailError.message);
      res.json({
        message: "If an account exists with this email, a reset link has been sent.",
        // For development - show the URL if email fails
        resetUrl: resetUrl // Remove in production
      });
    }

  } catch (error) {
    console.error("❌ Error in forgotPassword:", error);
    console.error("❌ Stack trace:", error.stack);
    res.status(500).json({
      message: "Server error. Please try again.",
      error: error.message
    });
  }
};

// RESET PASSWORD
exports.resetPassword = async (req, res, next) => {
  console.log("🚀 Reset password function called");

  try {
    const { token } = req.params;
    const { password } = req.body;

    console.log("🔑 Token received:", token.substring(0, 10) + "...");
    console.log("🔐 Password received:", password ? "Yes" : "No");

    if (!password) {
      console.log("❌ No password provided");
      return res.status(400).json({
        message: "Password is required"
      });
    }

    if (password.length < 6) {
      console.log("❌ Password too short");
      return res.status(400).json({
        message: "Password must be at least 6 characters"
      });
    }

    console.log("🔐 Hashing token...");
    const hashedToken = crypto
      .createHash("sha256")
      .update(token)
      .digest("hex");
    console.log("🔐 Hashed token:", hashedToken.substring(0, 10) + "...");

    console.log("🔍 Searching for user with valid token...");
    const user = await User.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpires: { $gt: Date.now() }
    });

    if (!user) {
      console.log("❌ Invalid or expired token");
      return res.status(400).json({
        message: "Reset token is invalid or expired."
      });
    }

    console.log("✅ User found:", user.email);

    // Hash new password
    console.log("🔐 Hashing new password...");
    user.password = await bcrypt.hash(password, 10);

    // Remove reset token
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    console.log("💾 Saving user with new password...");
    await user.save();
    console.log("✅ Password reset successful");

    res.json({
      message: "Password reset successful. You can now login."
    });

  } catch (error) {
    console.error("❌ Error in resetPassword:", error);
    console.error("❌ Stack trace:", error.stack);
    res.status(500).json({
      message: "Server error. Please try again.",
      error: error.message
    });
  }
};