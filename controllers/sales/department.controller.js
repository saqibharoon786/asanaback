const bcrypt = require("bcrypt");
const companyModel = require("../models/company/companyIndex.model"); // Import correctly
const upload = require("../config/multer"); // Assuming multer setup is in this file

//////////////////////////////////// Admin Controllers ///////////////////////////////////////////

// Add a new department
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

// Add a new employee to a department
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

    const existingEmployeeEmail = await companyModel.User.findOne({ email: employee_Email });
    if (existingEmployeeEmail) {
      return res.status(409).json({
        success: false,
        status: 409,
        message: "Employee already exists",
      });
    }



    const newUser = await companyModel.User.create({
      name: employee_Name,
      email: employee_Email,
      password: hashedPassword,
      contact: employee_Contact,
      address: employee_Address,
      image: employee_Image,
    });

    department.department_Employees.push({
      employee_Id: newUser._id, // Using the user's _id here
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

// Get all employees
const getEmployees = async (req, res) => {
  try {
    // Fetch all users from the User model
    const users = await companyModel.User.find();

    if (!users || users.length === 0) {
      return res.status(200).json({
        success: true,
        status: 404,
        message: "No users found",
        information: {
          users: []
        }
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

// Get all departments and their employees
const getDepartments = async (req, res) => {
  return res.send("Department /admin/deparmtent/get-departments");
  try {
    // Fetch all departments with their employees (populating the department_Employees field)
    const departments = await companyModel.Department.find().populate(
      "department_Employees.employee_Id"
    );

    if (!departments || departments.length === 0) {
      return res.status(200).json({
        success: true,
        status: 404,
        message: "No departments found",
        information: {
          departments: []
        }
      });
    }

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

// Delete an employee by email
// const deleteEmployee = async (req, res) => {
//   try {
//     const { email } = req.body;

//     // Check if the email is provided
//     if (!email) {
//       return res.status(400).json({
//         success: false,
//         status: 400,
//         message: "Employee email is required",
//       });
//     }

// Find the user by email to get the user _id
//     const user = await companyModel.User.findOne({ email });

//     if (!user) {
//       return res.status(404).json({
//         success: false,
//         status: 404,
//         message: "Employee not found",
//       });
//     }

//     // Find the department where the employee exists
//     const department = await companyModel.Department.findOne({
//       "department_Employees.employee_Id": user._id,
//     });

//     if (department) {
//       // If the employee exists in a department, remove the employee from the department_Employees array
//       const updatedDepartment = await companyModel.Department.updateOne(
//         { "department_Employees.employee_Id": user._id },
//         { $pull: { department_Employees: { employee_Id: user._id } } }
//       );

//       if (updatedDepartment.modifiedCount === 0) {
//         return res.status(500).json({
//           success: false,
//           status: 500,
//           message: "Failed to remove the employee from department",
//         });
//       }
//     }

//     // Delete the employee from the User collection
//     const deletedUser = await companyModel.User.deleteOne({ email });

//     if (deletedUser.deletedCount === 0) {
//       return res.status(500).json({
//         success: false,
//         status: 500,
//         message: "Failed to delete the employee",
//       });
//     }

//     // If the employee was found in a department, populate the updated department info
//     let updatedDepartmentInfo = null;
//     if (department) {
//       const updatedDepartment = await companyModel.Department.findById(department._id).populate('department_Employees.employee_Id');
//       updatedDepartmentInfo = {
//         department_Id: updatedDepartment._id,
//         department_Name: updatedDepartment.department_Name,
//         remainingEmployees: updatedDepartment.department_Employees,
//       };
//     }

//     // Return the details of the deleted employee and the updated department (if applicable)
//     return res.status(200).json({
//       success: true,
//       status: 200,
//       message: "Employee deleted successfully",
//       information: {
//         deletedEmployee: {
//           name: user.name,
//           email: user.email,
//           department: department ? department.department_Name : 'No department',
//         },
//         updatedDepartment: updatedDepartmentInfo,
//       },
//     });
//   } catch (error) {
//     console.error("Error deleting employee:", error);
//     return res.status(500).json({
//       success: false,
//       status: 500,
//       message: error.message,
//     });
//   }
// };

const deleteEmployee = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Please provide the email of the employee."
      });
    }

    // Find the user by email
    const user = await companyModel.User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found."
      });
    }

    const userId = user._id;

    // Mark the user as deleted by updating the 'status' field
    await companyModel.User.updateOne(
      { email }, // Find the user by email
      { $set: { deleted: true } } // Update the 'deleted' field to true
    );

    // Remove the user from the department_Employees array
    await companyModel.Department.updateMany(
      { "department_Employees.employee_Id": userId },
      { $pull: { department_Employees: { employee_Id: userId } } }
    );

    // Remove the user from the project_Employees array
    await companyModel.Project.updateMany(
      { "project_Employees.employee_Id": userId },
      { $pull: { project_Employees: { employee_Id: userId } } }
    );

    return res.status(200).json({
      success: true,
      message: "Employee marked as deleted successfully."
    });
  } catch (error) {
    console.error("Error deleting employee:", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// const getUserDepartments = async (req, res) => {
//   try {
//     const user = req.user;
//     const userId = user._id;

//     // Find all departments where the userId is in department_Employees array
//     const departments = await companyModel.Department.find({
//       "department_Employees.employee_Id": userId,
//     })
//       // Populate employee details for each employee in the department
//       .populate({
//         path: "department_Employees.employee_Id", // Populate the employee_Id field
//         model: "User", // Referring to the User model
//         select: "name email contact image" // Select only necessary fields
//       });

//     // Loop through each department to map the employees correctly
//     const result = departments.map(department => {
//       const employees = department.department_Employees.map(emp => {
//         return {
//           employee_Id: emp.employee_Id, // User object (populated)
//           employee_Role: emp.employee_Role,
//         };
//       });

//       return {
//         department_Name: department.department_Name,
//         employees: employees,
//       };
//     });

//     return res.status(200).json({
//       success: true,
//       status: 200,
//       message: "User Departments",
//       information: { departments: result },  // Return the list of departments and employees
//     });
//   } catch (error) {
//     console.error("Error fetching departments by user ID:", error);
//     return res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };
const getUserDepartments = async (req, res) => {
  try {
    const employee_Id = req.user._id;

    if (!employee_Id) {
      return res.status(400).json({
        success: false,
        message: "Employee ID is required in the request body.",
      });
    }

    const User = companyModel.User;
    // Find departments where the given employee ID is present in department_Employees array
    const departments = await companyModel.Department.find({
      "department_Employees.employee_Id": employee_Id,
    })
      .populate({
        path: "department_Employees.employee_Id", // Populate employee_Id with User details
        model: "User", // Refer to the User model
        select: "name email contact image", // Only include specific fields
      });

    if (!departments || departments.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No departments found for the given employee ID.",
      });
    }

    // Prepare response to include departments and populated employee details
    const result = departments.map((department) => {
      const employees = department.department_Employees.map((emp) => {
        return {
          employee_Id: emp.employee_Id._id, // User's ObjectId
          name: emp.employee_Id.name, // User's name
          email: emp.employee_Id.email, // User's email
          contact: emp.employee_Id.contact, // User's contact
          image: emp.employee_Id.image, // User's image
          employee_Role: emp.employee_Role, // Role in department
        };
      });

      return {
        department_Name: department.department_Name,
        employees: employees,
      };
    });

    return res.status(200).json({
      success: true,
      status: 200,
      message: "Departments and employees retrieved successfully",
      information: { departments: result },
    });
  } catch (error) {
    console.error("Error fetching departments and employees:", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const department = {
  addDepartment,
  addEmployeeToDepartment,
  getEmployees,
  getDepartments,
  deleteEmployee,
  getUserDepartments
};

module.exports = department;
