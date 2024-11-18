const roleAdminCheck = require("./adminRole.middleware");
const roleModeratorCheck = require("./moderatorRole.middleware");
const roleUserCheck = require("./userRole.middleware");

const middleware = {
  roleAdminCheck,
  roleModeratorCheck,
  roleUserCheck,
};

module.exports = middleware;
