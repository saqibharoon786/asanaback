const express = require("express");
const model = require("../models/index.model");

const adminHome = async (req, res) => {
  try {
    res.send("Admin Info");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const admin = {
  adminHome,
};

module.exports = admin;
