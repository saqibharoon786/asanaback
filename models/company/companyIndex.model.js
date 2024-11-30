const User = require("./user.model");
const Department = require("./department.model");
const Project = require("./project.model");

const companyModel = {
  User,
  Department,
  Project,
};

module.exports = companyModel;
