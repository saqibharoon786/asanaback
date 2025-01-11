const companyModel = require("../../models/company/companyIndex.model");

const getPackages = async (req, res) => {
  try {
    const packages = await companyModel.Package.find();

    return res.status(201).json({
      success: true,
      status: 201,
      message: "Package created successfully.",
      information: { packages: packages },
    });
  } catch (error) {
    console.error("Error creating package:", error);
    return res.status(500).json({
      success: false,
      status: 500,
      message: error.message,
    });
  }
};

const addPackages = async (req, res) => {
  try {
    const {
      package_Name,
      package_Description,
      package_price,
      package_Services,
    } = req.body;

    if (!package_Name) {
      return res.status(400).json({
        success: false,
        status: 400,
        message: "Package name is required.",
      });
    }

    // Check if the package already exists
    const existingPackage = await companyModel.Package.findOne({
      package_Name,
    });

    if (existingPackage) {
      return res.status(409).json({
        success: false,
        status: 409,
        message: "Package already exists.",
      });
    }

    // Create the new package
    const newPackage = await companyModel.Package.create({
      package_Name,
      package_Description,
      package_price,
      package_Services: package_Services,
    });

    return res.status(201).json({
      success: true,
      status: 201,
      message: "Package created successfully.",
      information: newPackage,
    });
  } catch (error) {
    console.error("Error creating package:", error);
    return res.status(500).json({
      success: false,
      status: 500,
      message: error.message,
    });
  }
};

const packages = {
  addPackages,
  getPackages,
};

module.exports = packages;
