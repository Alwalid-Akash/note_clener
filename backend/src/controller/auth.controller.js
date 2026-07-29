const bcrypt = require("bcrypt");
const User = require("../models/User");
const ApiError = require("../utils/ApiError");


const register = async (req, res, next) => {

  try {

    // 1. Get data from user request
    const { name, email, password } = req.body;

    // 2. Check if user already exists
    const userExist = await User.findOne({
      email: email
    });

    if (userExist) {

      throw new ApiError(
        409,
        "Email already exists"
      );

    }
    // 3. Convert password into a secure password
    const hashedPassword = await bcrypt.hash(
      password,
      12
    );
    // 4. Create new user in MongoDB
    const user = await User.create({

      name: name,

      email: email,

      password: hashedPassword

    });
    // 5. Send response to frontend
    res.status(201).json({
      message: "Registration successful",

      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }

    });
  } catch (error) {
    // Send error to error handling middleware
    next(error);
  }
};

module.exports = register;