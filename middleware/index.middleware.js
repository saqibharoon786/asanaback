const adminRoleCheck = require("./adminRoleCheck.middleware");
const userRoleCheck = require("./userRoleCheck.middleware");

const middleware = {
  adminRoleCheck,
  userRoleCheck,
};

module.exports = middleware;
