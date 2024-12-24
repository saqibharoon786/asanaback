const express = require("express");
const companyModel = require("../models/company/companyIndex.model");
const bcrypt = require("bcrypt");
const utils = require("../utils/utilsIndex");

// Variables
const saltRounds = 10;

const signUp = async (req, res) => {
  try {
    const { name, email, password, contact } = req.body; // Ensure all fields are included

    // Check for required fields
    if (!name || !email || !password || !contact) {
      return res.status(400).json({
        success: false,
        status: 400,
        message: "All fields required",
      });
    }

    // Check if the email already exists
    const existingUserEmail = await companyModel.User.findOne({ email });
    if (existingUserEmail) {
      return res.status(409).json({
        success: false,
        status: 409,
        message: "User already Exists",
      });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const userId = await utils.generateUniqueUserId(name);

    // Create a new user with the hashed password and append the role
    const newUser = await companyModel.User.create({
      name,
      userId,
      email,
      password: hashedPassword,
      contact,
      department: "Admin",
    });

    // Return a success message with the necessary user details
    return res.status(200).json({
      success: true,
      status: 200,
      message: "User created successfully",
      information: {
        createdUser: {
          name: newUser.name,
          email: newUser.email,
          contact: newUser.contact,
          admin: newUser.admin,
        },
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false, // Fixed typo here
      status: 500,
      message: error.message,
    });
  }
};

module.exports = signUp;
