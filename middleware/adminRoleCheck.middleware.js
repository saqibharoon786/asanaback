const adminRoleCheck = async (req, res, next) => {
  try {
    const user = req.user;

    if (user.access !== "Admin") {
      return res.status(401).json({ message: "Unauthorized Access" });
    }

    next();
  } catch (error) {
    console.error("Authorization error:", error);
    return res.status(500).json({ message: "Unauthorized Access" });
  }
};

module.exports = adminRoleCheck;
