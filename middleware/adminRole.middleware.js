const express = require("express");
const model = require("../models/index.model");

const roleAdminCheck = async (req, res, next) => {
  try {
    const user = req.user;
    if (user.role != "admin") {
      return res.status(401).json({ message: "Unauthorized Access" });
    }
    next();
  } catch (error) {
    res.status(500).json({ message: "Unauthorized Access" });
  }
};

module.exports = roleAdminCheck;
