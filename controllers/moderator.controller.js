const express = require("express");
const model = require("../models/index.model");

const moderatorHome = async (req, res) => {
  try {
    res.send("Moderator Info");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const moderator = {
  moderatorHome,
};

module.exports = moderator;
