const adminRoleCheck = require("./adminRoleCheck.middleware");
const hrRoleCheck = require("./hrRoleCheck.middleware");

const middleware = {
  adminRoleCheck,
  hrRoleCheck,
};

module.exports = middleware;
