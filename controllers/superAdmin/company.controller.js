const bcrypt = require("bcrypt");
const companyModel = require("../../models/company/companyIndex.model");
const utils = require("../../utils/utilsIndex");

const addCompany = async (req, res) => {
  try {
    const {
      company_Name,
      company_Email,
      company_Address,
      package_Type,
    } = req.body;

    const company_ImagePath = `/uploads/company/${req.file.filename}`;

    const existingCompany = await companyModel.Company.findOne({
      company_Email,
    });

    if (existingCompany) {
      return res.status(409).json({
        success: false,
        status: 409,
        message: "Company already exists",
      });
    }

    const packageData = await companyModel.Package.findOne({
      package_Name: package_Type,
    });
    if (!packageData) {
      return res.status(404).json({
        success: false,
        status: 404,
        message: `Package with name "${package_Type}" not found.`,
      });
    }

    const companyId = await utils.generateUniqueCompanyId(company_Name);

    const newCompany = await companyModel.Company.create({
      companyId,
      company_Name,
      company_Email,
      company_Address,
      company_image: {
        filePath: company_ImagePath,
      },
      package_Type: {
        package_Name: packageData.package_Name,
      },
    });

    return res.status(201).json({
      success: true,
      status: 201,
      message: "Company added successfully",
      information: newCompany,
    });
  } catch (error) {
    console.error("Error adding company:", error);
    return res.status(500).json({
      success: false,
      status: 500,
      message: error.message,
    });
  }
};

const addAdminToCompany = async (req, res) => {
  try {
    const { companyId } = req.params;

    const {
      employee_Access,
      employee_Name,
      employee_Email,
      employee_Password,
      employee_Contact,
      employee_Address,
    } = req.body;


    // Check if the employee image is present in req.file
    if (!req.file) {
      return res.status(400).json({
        success: false,
        status: 400,
        message: "Employee image is required",
      });
    }

    // Use req.file.path to build the correct image path
    const admin_ImagePath = `/uploads/admin/${req.file.filename}`;

    // Generate unique user ID and encrypt password
    const userId = await utils.generateUniqueUserId(employee_Name);
    const hashedPassword = await bcrypt.hash(employee_Password, 10);

    const existingEmployeeEmail = await companyModel.User.findOne({ email: employee_Email });
    if (existingEmployeeEmail) {
      return res.status(409).json({
        success: false,
        status: 409,
        message: "Employee already exists",
      });
    }

    // Save new user with the image filepath
    const newUser = await companyModel.User.create({
      companyId: companyId,
      name: employee_Name,
      userId: userId,
      email: employee_Email,
      password: hashedPassword,
      contact: employee_Contact,
      address: employee_Address,
      image: {
        filePath: admin_ImagePath,
      },
      access: employee_Access,
    });

    return res.status(201).json({
      success: true,
      status: 201,
      message: "Employee added successfully",
      information: { newUser },
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


const company = {
  addCompany,
  addAdminToCompany
};

module.exports = company;
