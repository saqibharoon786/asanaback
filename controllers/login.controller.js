const express = require("express");
const companyModel = require("../models/company/companyIndex.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const joi = require("joi");

const SECRET = "1234";

const loggingIn = async (req, res) => {
  try {
    const { employee_Email, employee_Password } = req.body;

    // Check for required fields
    if (!employee_Email || !employee_Password) {
      return res.status(400).json({
        success: false,
        status: 400,
        message: "All fields required",
      });
    }

    const emailSchema = joi.string().email().required();
    const { error } = emailSchema.validate(employee_Email); // Validate the email

    if (error) {
      return res.status(422).json({
        success: false,
        status: 422,
        message: "Email format Incorrect",
      });
    }

    const employee = await companyModel.Employee.findOne({ employee_Email });

    if (!employee) {
      return res.status(401).json({
        success: false,
        status: 401,
        message: "Invalid email or password",
      });
    }

    const validPassword = await bcrypt.compare(
      employee_Password,
      employee.employee_Password
    );

    if (!validPassword) {
      return res.status(400).json({
        success: false,
        status: 400,
        message: "Invalid email or password",
      });
    }

    // Generate JWT
    const jwtLoginToken = jwt.sign({ employee_Email }, SECRET, {
      expiresIn: "7d",
    });

    return res.status(200).json({
      success: true,
      status: 200,
      message: "User login successful",
      information: {
        employee: {
          name: employee.employee_Name,
          email: employee.employee_Email,
          role: employee.employee_role,
        },
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
