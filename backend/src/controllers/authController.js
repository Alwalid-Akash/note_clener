const bcrypt = require("bcrypt");

const User = require("../models/user");
const generateToken = require("../utils/generateToken");
//register controller
exports.register = async (req, res, next) => {
  try {

    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "Email already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    const token = generateToken(user._id);

    res.status(201).json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });

  } catch (error) {
    next(error);
  }
};


//login controler
exports.login = async (req, res, next) => {

  try {

    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {

      return res.status(401).json({
        message: "Invalid credentials",
      });

    }

    const isMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!isMatch) {

      return res.status(401).json({
        message: "Invalid credentials",
      });

    }

    const token = generateToken(user._id);

    res.json({

      success: true,

      token,

      user: {

        id: user._id,
        name: user.name,
        email: user.email,

      },

    });

  } catch (error) {

    next(error);

  }

};