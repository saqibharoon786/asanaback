const express = require("express");
const model = require("../models/index.model");

const userHome = async (req, res) => {
  try {
    res.send("User Home");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const user = {
  userHome,
};

module.exports = user;
