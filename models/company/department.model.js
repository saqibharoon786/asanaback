const mongoose = require("mongoose");

const departmentSchema = new mongoose.Schema(
  {
    department_Name: { type: String, required: true },
    department_Employees: [
      {
        employee_Id: { type: String },
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
