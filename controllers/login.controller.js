const express = require("express");
const model = require("../models/index.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const joi = require("joi");

const loggingIn = async (req, res) => {
  const { email, password } = req.body;
  const emailSchema = joi.string().email().required();
  const { error } = emailSchema.validate(email); // Validate the email

  if (error) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid email format" });
  }

  try {
    const user = await model.User.findOne({ email: email }); // No need for 'where'

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid email/username or password",
      });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(400).json({
        success: false,
        message: "Invalid email/username or password",
      });
    }

    // Generate JWT
    const token = jwt.sign({ email: user.email }, "1234", { expiresIn: "7d" });

    res.json({
      success: true,
      message: "User login successful",
      data: {
        token: token,
      },
    });
  } catch (error) {
    console.log("Login error:", error); // Added for debugging
    return res
      .status(500)
      .json({ success: false, message: "An error occurred during login." });
  }
};

module.exports = loggingIn;
