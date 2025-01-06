const adminRoleCheck = require("./adminRoleCheck.middleware");
const hrRoleCheck = require("./hrRoleCheck.middleware");
const salesRoleCheck = require("./salesRoleCheck.middleware");
const superAdminAccessCheck = require("./superAdminAccessCheck");
const checkPermission = require("./checkPermission");

const middleware = {
  adminRoleCheck,
  hrRoleCheck,
  salesRoleCheck,
  superAdminAccessCheck,
  checkPermission
};

module.exports = middleware;
