require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const joi = require("joi");
const companyModel = require("../models/company/companyIndex.model");

const JWT_SECRET = process.env.JWT_SECRET;

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    // Check for required fields
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        status: 400,
        message: "All fields required",
      });
    }

    // Validate email format
    const emailSchema = joi.string().email().required();
    const { error } = emailSchema.validate(email);
    if (error) {
      return res.status(422).json({
        success: false,
        status: 422,
        message: "Email format Incorrect",
      });
    }

    // Check if email belongs to a user
    const user = await companyModel.User.findOne({ email });
    if (user) {
      // If it's a user, compare password
      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword) {
        return res.status(400).json({
          success: false,
          status: 400,
          message: "Invalid email or password",
        });
      }

      // Generate JWT for user
      const jwtLoginToken = jwt.sign({ email: user.email }, JWT_SECRET, {
        expiresIn: "7d", // Token expires in 7 days
      });

      return res.status(200).json({
        success: true,
        status: 200,
        message: "User login successful",
        information: {
          user: user,
          jwtLoginToken: jwtLoginToken, // JWT token for user
        },
      });
    }
  } catch (error) {
    console.log("Login error:", error);
    return res.status(500).json({
      success: false,
      status: 500,
      message: error.message,
    });
  }
};

module.exports = login;
