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
        employee_Id: { type: String },
        employee_Role: { type: String },
      },
    ],
    project_Creator: {
      type: String,
    },
    project_Progress: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

const Projects = mongoose.model("Projects", projectSchema);

module.exports = Projects;
