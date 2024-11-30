const mongoose = require("mongoose");

const departmentSchema = new mongoose.Schema(
  {
    department_Name: { type: String, required: true },
    department_Employees: [
      {
        employee_Name: { type: String },
        employee_Email: { type: String },
        employee_Password: { type: String },
        employee_Contact: { type: String },
        employee_Address: { type: String },
        employee_Image: {
          type: Object,
          required: true,
        },
        employee_Role: {
          type: String,
          enum: ["moderator", "employee"],
          default: "employee",
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Department = mongoose.model("Department", departmentSchema);

module.exports = Department;
