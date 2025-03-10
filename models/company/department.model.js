const mongoose = require("mongoose");

const departmentSchema = new mongoose.Schema(
  {
    companyId: { type: String },
    department_Name: { type: String, required: true },
    department_Employees: [
      {
        userId: { type: String },
        employee_Designation: {
          type: String,
        },
        deleted: { type: Boolean, default: false },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Department = mongoose.model("Department", departmentSchema);
module.exports = Department;
