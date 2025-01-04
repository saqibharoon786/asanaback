const bcrypt = require("bcrypt");
const companyModel = require("../../models/company/companyIndex.model"); // Import correctly
const utils = require("../../utils/utilsIndex");

// Add a new department
const addEvent = async (req, res) => {
    try {
      const companyId = req.user.companyId;
  
      const newEvent = await companyModel.Event.create({
        event_Name: req.body.event_Name,
        event_Description: req.body.event_Description,
        event_organizer: req.body.event_organizer,
        event_location: req.body.event_location,
        event_Date: req.body.event_Date,
        event_Image: {
          filePath: req.body.event_Image.filePath,
        },
      });
  
      return res.status(201).json({
        success: true,
        status: 201,
        message: "Event created successfully",
        information: {
          newEvent: newEvent,
        },
      });
    } catch (error) {
      console.error("Error creating event:", error);
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
    const companyId = req.user.companyId;
    const {
      department_Name,
      employee_Name,
      employee_Email,
      employee_Password,
      employee_Designation,
      employee_Contact,
      employee_Address,
    } = req.body;

    // Validate required fields
    if (
      !department_Name ||
      !employee_Name ||
      !employee_Email ||
      !employee_Password ||
      !employee_Designation ||
      !employee_Contact ||
      !employee_Address
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // Validate file upload
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Employee image is required",
      });
    }

    // Build the correct image path
    const employee_ImagePath = `/uploads/employee/${req.file.filename}`;

    // Check if department exists
    const department = await companyModel.Department.findOne({
      companyId,
      department_Name,
    });

    if (!department) {
      return res.status(404).json({
        success: false,
        message: "No department with this name found in the company",
      });
    }

    // Check for duplicate email
    const existingEmployee = await companyModel.User.findOne({ email: employee_Email });
    if (existingEmployee) {
      return res.status(409).json({
        success: false,
        message: "Employee with this email already exists",
      });
    }

    // Generate unique user ID and hash password
    const userId = await utils.generateUniqueUserId(employee_Name);
    const hashedPassword = await bcrypt.hash(employee_Password, 10);

    // Create new employee record
    const newUser = await companyModel.User.create({
      companyId:companyId,
      name: employee_Name,
      userId,
      email: employee_Email,
      password: hashedPassword,
      contact: employee_Contact,
      address: employee_Address,
      image: { filePath: employee_ImagePath },
      department: department_Name,
    });

    // Add employee to department's employee list
    department.department_Employees.push({
      userId,
      employee_Designation,
      deleted: false,
    });

    await department.save();

    return res.status(201).json({
      success: true,
      message: "Employee added successfully",
      information: { newUser },
    });
  } catch (error) {
    console.error("Error adding employee:", error);
    return res.status(500).json({
      success: false,
      message: "An error occurred while adding the employee",
    });
  }
};

// Get all employees
const getAllEmployees = async (req, res) => {
  try {
    const companyId = req.user.companyId;
    const users = await companyModel.User.find({companyId:companyId});

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
  try {
    const companyId = req.user.companyId;
    const departments = await companyModel.Department.find({companyId:companyId}).populate(
      "department_Employees.userId"
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
          employees: department.department_Employees,
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

const deleteEmployee = async (req, res) => {
  try {
    const companyId = req.user.companyId;
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Please provide the email of the employee.",
      });
    }

    // Find the user by email and companyId
    const user = await companyModel.User.findOne({ email, companyId });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found or does not belong to the specified company.",
      });
    }

    const userId = user._id; // Use MongoDB's `_id` for consistency

    // Mark the user as deleted
    await companyModel.User.updateOne(
      { _id: userId },
      { $set: { deleted: true } }
    );

    // Mark the user as deleted in the department's employees list
    await companyModel.Department.updateOne(
      { companyId, "department_Employees.userId": userId },
      { $set: { "department_Employees.$.deleted": true } }
    );

    return res.status(200).json({
      success: true,
      message: "Employee marked as deleted successfully.",
    });
  } catch (error) {
    console.error("Error deleting employee:", error);
    return res.status(500).json({
      success: false,
      message: "An error occurred while deleting the employee.",
    });
  }
};


const getEmployeeInformation = async (req, res) => {
  try {
    const companyId = req.user.companyId;
    const { userId } = req.params;

    // Find the user
    const user = await companyModel.User.findOne({ userId: userId, companyId });

    // Find the department where department_Employees contains the given userId
    const department = await companyModel.Department.findOne({companyId,
      department_Employees: { $elemMatch: { userId: userId, deleted: false }},
    });

    // Find the employee's designation in the department_Employees array
    const employeeInfo = department?.department_Employees.find(emp => emp.userId === userId && emp.deleted === false);

    return res.status(200).json({
      success: true,
      status: 200,
      message: "Department and User retrieved successfully",
      information: {
        user,
        department: department?.department_Name,
        employee_Designation: employeeInfo?.employee_Designation,
      },
    });
    
  } catch (error) {
    console.error("Error fetching", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const updateEmployee = async (req, res) => {
  try {
    const companyId = req.user.companyId;
    const { userId } = req.params;
    const {
      employee_NewName,
      employee_NewEmail,
      employee_NewPassword,
      employee_NewDesignation,
      employee_NewContact,
      employee_NewAddress,
      employee_NewDepartment,
    } = req.body;

    // Step 1: Find the user by userId and companyId
    const user = await companyModel.User.findOne({ userId, companyId });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found or does not belong to the specified company",
      });
    }

    // Step 2: Hash new password if provided
    let hashedPassword = user.password;
    if (employee_NewPassword) {
      hashedPassword = await bcrypt.hash(employee_NewPassword, 10);
    }

    // Construct new image path if a new image is uploaded
    const newEmployee_ImagePath = req.file ? `/uploads/employee/${req.file.filename}` : user.image?.filePath;

    // Step 3: Update user information in the database
    const updatedUser = await companyModel.User.findOneAndUpdate(
      { userId, companyId },
      {
        name: employee_NewName || user.name,
        email: employee_NewEmail || user.email,
        password: hashedPassword,
        contact: employee_NewContact || user.contact,
        address: employee_NewAddress || user.address,
        image: { filePath: newEmployee_ImagePath },
        department: employee_NewDepartment || user.department,
        
      },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(500).json({ success: false, message: "Failed to update the user" });
    }

    // Step 4: Handle department updates
    const previousDepartment = await companyModel.Department.findOne({
      companyId,
      department_Name: user.department,
    });

    const employee_NewDepartmentDoc = await companyModel.Department.findOne({
      companyId,
      department_Name: employee_NewDepartment,
    });

    if (!employee_NewDepartmentDoc) {
      return res.status(404).json({
        success: false,
        message: "New department does not exist for the specified company",
      });
    }

    if (previousDepartment && previousDepartment.department_Name !== employee_NewDepartment) {
      // Step 5: Soft delete the user in the previous department
      const previousEmployeeIndex = previousDepartment.department_Employees.findIndex(
        (emp) => emp.userId === userId
      );

      if (previousEmployeeIndex !== -1) {
        previousDepartment.department_Employees[previousEmployeeIndex].deleted = true;
        await previousDepartment.save();
      }

      // Step 6: Add the user to the new department's department_Employees array
      employee_NewDepartmentDoc.department_Employees.push({
        userId: userId,
        employee_Designation: employee_NewDesignation,
        deleted: false,
      });

      await employee_NewDepartmentDoc.save();
    }

    return res.status(200).json({
      success: true,
      status: 200,
      message: "User and department information updated successfully",
      information: {
        updatedUser,
        employee_NewDepartmentDoc,
      },
    });
  } catch (error) {
    console.error("Error updating employee:", error);
    return res.status(500).json({
      success: false,
      status: 500,
      message: error.message,
    });
  }
};


const department = {
  addEvent,
  addEmployeeToDepartment,
  getAllEmployees,
  getDepartments,
  getEmployeeInformation,
  updateEmployee, 
  deleteEmployee,
};

module.exports = department;
