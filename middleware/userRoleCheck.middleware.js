const express = require("express");

const userRoleCheck = async (req, res, next) => {
  try {
    const user = req.user;
    if (user.admin === false) {
      return next();
    }
    return res.status(401).json({ message: "Unauthorized Access" });
  } catch (error) {
    res.status(500).json({ message: "Unauthorized Access" });
  }
};

module.exports = userRoleCheck;
