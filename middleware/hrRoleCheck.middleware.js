const express = require("express");

const hrRoleCheck = async (req, res, next) => {
  try {
    const user = req.user;
    if (user.department !== "HR") {
      return res.status(401).json({ message: "Unauthorized Access" });
    }
    next();
  } catch (error) {
    res.status(500).json({ message: "Unauthorized Access" });
  }
};

module.exports = hrRoleCheck;
