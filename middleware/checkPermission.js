const checkPermission = (requiredPermission) => {
  return (req, res, next) => {
    const user = req.user; // Assuming you have `req.user` populated from authentication
    const urlPath = req.originalUrl; // Get the full URL path
    let resource = "";

    if (urlPath.includes("lead")) {
      resource = "lead";
    } else if (urlPath.includes("quote")) {
      resource = "quote";
    } else if (urlPath.includes("invoice")) {
      resource = "invoice";
    } else if (urlPath.includes("department")) {
      resource = "department";
    } else if (urlPath.includes("product")) {
      resource = "product";
    } else if (urlPath.includes("customer")) {
      resource = "customer";
    }
    // Check if the resource exists in the user's permissions
    if (
      user.permissions[resource] &&
      user.permissions[resource].includes(requiredPermission)
    ) {
      return next();
    } else {
      return res.status(403).json({ error: "Unauthorized" });
    }
  };
};

module.exports = checkPermission;
