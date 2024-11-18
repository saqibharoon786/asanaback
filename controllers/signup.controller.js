const express = require("express");
const model = require("../models/index.model");
const bcrypt = require("bcrypt");

// Variables
const saltRounds = 10;

const signUp = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  // Check for required fields
  if (!firstName || !lastName || !email || !password) {
    return res.status(400).send("All fields are required.");
  }

  try {
    // Check if the email already exists
    const existingUser = await model.User.findOne({ email });
    if (existingUser) {
      return res.status(400).send("Email already exists.");
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create a new user with the hashed password and append the role
    const newUser = await model.User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    // Return a success message with the necessary user details
    return res.status(200).json({
      message: "User created successfully",
      createdUser: {
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        email: newUser.email,
        password: newUser.password,
      },
    });
  } catch (error) {
    console.error("Error during signup:", error);
    return res.status(500).json({ message: "Error occurred during signup." });
  }
};

module.exports = signUp;
