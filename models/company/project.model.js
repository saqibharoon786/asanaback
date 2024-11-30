const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    project_Name: {
      type: String,
    },
    project_Department: {
      type: String,
    },
    project_Employees: [
      {
        employee_Name: { type: String },
        employee_Role: { type: String },
        employee_Email: { type: String },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Projects = mongoose.model("Projects", projectSchema);

module.exports = Projects;
