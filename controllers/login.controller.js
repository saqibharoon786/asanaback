const express = require("express");
const companyModel = require("../models/company/companyIndex.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const joi = require("joi");

const SECRET = "1234";

const loggingIn = async (req, res) => {
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

    const emailSchema = joi.string().email().required();
    const { error } = emailSchema.validate(email); // Validate the email

    if (error) {
      return res.status(422).json({
        success: false,
        status: 422,
        message: "Email format Incorrect",
      });
    }

    const employee = await companyModel.User.findOne({ email });

    if (!employee) {
      return res.status(401).json({
        success: false,
        status: 401,
        message: "Invalid email or password",
      });
    }

    const validPassword = await bcrypt.compare(password, employee.password);

    if (!validPassword) {
      return res.status(400).json({
        success: false,
        status: 400,
        message: "Invalid email or password",
      });
    }

    // Generate JWT
    const jwtLoginToken = jwt.sign({ email }, SECRET, {
      expiresIn: "7d",
    });

    return res.status(200).json({
      success: true,
      status: 200,
      message: "User login successful",
      information: {
        user: employee,
        jwtLoginToken: jwtLoginToken,
      },
    });
  } catch (error) {
    console.log("Login error:", error); // Added for debugging
    return res
      .status(500)
      .json({ success: false, status: 500, message: error.message });
  }
};

module.exports = loggingIn;
