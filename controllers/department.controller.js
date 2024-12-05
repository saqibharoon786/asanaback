const bcrypt = require("bcrypt");
const companyModel = require("../models/company/companyIndex.model"); // Import correctly
const upload = require("../config/multer"); // Assuming multer setup is in this file

//////////////////////////////////// Admin Controllers ///////////////////////////////////////////
const addDepartment = async (req, res) => {
  try {
    const { department_Name } = req.body;

    if (!department_Name) {
      return res.status(400).json({
        success: false,
        status: 400,
        message: "Department name is required",
      });
    }

    const department = await companyModel.Department.findOne({
      department_Name,
    });

    if (department) {
      return res.status(409).json({
        success: false,
        status: 409,
        message: "Department already exists",
      });
    }

    const newDepartment = await companyModel.Department.create({
      department_Name,
    });

    return res.status(201).json({
      success: true,
      status: 201,
      message: "Department created successfully",
      information: { createdDepartment: { department_Name } },
    });
  } catch (error) {
    console.error("Error creating department:", error);
    return res.status(500).json({
      success: false,
      status: 500,
      message: error.message,
    });
  }
};

const addEmployeeToDepartment = async (req, res) => {
  try {
    const {
      department_Name,
      employee_Name,
      employee_Email,
      employee_Password,
      employee_Role,
      employee_Contact,
      employee_Address,
    } = req.body;

    if (
      !department_Name ||
      !employee_Name ||
      !employee_Email ||
      !employee_Password ||
      !employee_Role ||
      !employee_Contact ||
      !employee_Address
    ) {
      return res.status(400).json({
        success: false,
        status: 400,
        message: "All text fields are required",
      });
    }

    if (!req.file) {
      return res.status(400).json({
        success: false,
        status: 400,
        message: "Employee image is required",
      });
    }

    const department = await companyModel.Department.findOne({
      department_Name,
    });

    if (!department) {
      return res.status(404).json({
        success: false,
        status: 404,
        message: "No department with this name",
      });
    }

    const hashedPassword = await bcrypt.hash(employee_Password, 10);

    const employee_Image = {
      filename: req.file.originalname,
      contentType: req.file.mimetype,
      imageBase64: req.file.buffer.toString("base64"),
    };

    const newUser = await companyModel.User.create({
      name: employee_Name,
      email: employee_Email,
      password: hashedPassword,
      contact: employee_Contact,
      address: employee_Address,
      image: employee_Image,
    });

    department.department_Employees.push({
      employee_Id: newUser._id,
      employee_Role,
    });

    await department.save();

    return res.status(201).json({
      success: true,
      status: 201,
      message: "Employee added successfully",
      information: { department },
    });
  } catch (error) {
    console.error("Error adding employee:", error);
    return res.status(500).json({
      success: false,
      status: 500,
      message: error.message,
    });
  }
};

const getEmployees = async (req, res) => {
  try {
    // Fetch all users from the User model
    const users = await companyModel.User.find();

    if (!users || users.length === 0) {
      return res.status(404).json({
        success: false,
        status: 404,
        message: "No users found",
      });
    }

    return res.status(200).json({
      success: true,
      status: 200,
      message: "Users retrieved successfully",
      information: { users },
    });
  } catch (error) {
    console.error("Error fetching users:", error);
    return res.status(500).json({
      success: false,
      status: 500,
      message: error.message,
    });
  }
};

const getDepartments = async (req, res) => {
  try {
    // Fetch all departments with their employees (populating the department_Employees field)
    const departments = await companyModel.Department.find().populate(
      "department_Employees"
    );

    if (!departments || departments.length === 0) {
      return res.status(404).json({
        success: false,
        status: 404,
        message: "No departments found",
      });
    }

    // Return the department names along with the employees (user details)
    return res.status(200).json({
      success: true,
      status: 200,
      message: "Departments and employees retrieved successfully",
      information: {
        departments: departments.map((department) => ({
          department_Name: department.department_Name,
          employees: department.department_Employees, // You can customize which employee fields you want to include
        })),
      },
    });
  } catch (error) {
    console.error("Error fetching departments and employees:", error);
    return res.status(500).json({
      success: false,
      status: 500,
      message: error.message,
    });
  }
};

const deparment = {
  // Admin
  addDepartment,
  addEmployeeToDepartment,
  getEmployees,
  getDepartments,
};
module.exports = deparment;
