const express = require("express");
const model = require("../models/index.model");

const roleModeratorCheck = async (req, res, next) => {
  try {
    const user = req.user;
    if (user.role != "moderator") {
      return res.status(401).json({ message: "Unauthorized Access" });
    }
    next();
  } catch (error) {
    res.status(500).json({ message: "Unauthorized Access" });
  }
};

module.exports = roleModeratorCheck;
