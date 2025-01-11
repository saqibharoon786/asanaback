const bcrypt = require("bcrypt");
const companyModel = require("../../models/company/companyIndex.model");

const saltRounds = 10;

const initializeSuperAdmin = async () => {
  try {
    const existingSuperAdmin = await companyModel.User.findOne({
      email: "superadmin@gmail.com",
    });

    if (!existingSuperAdmin) {
      const hashedPassword = await bcrypt.hash("123", saltRounds);

      const defaultPermissions = {
        invoice: ["create", "read", "update", "delete"],
        lead: ["create", "read", "update", "delete"],
        quote: ["create", "read", "update", "delete"],
        product: ["create", "read", "update", "delete"],
        department: ["create", "read", "update", "delete"],
        company: ["create", "read", "update", "delete"],
        event: ["create", "read", "update", "delete"],
      };

      const superAdmin = await companyModel.User.create({
        companyId: "TTech",
        name: "superAdmin",
        userId: "SU-1",
        email: "superadmin@gmail.com",
        password: hashedPassword,
        contact: "03110000000",
        access: "SuperAdmin",
        permissions: defaultPermissions,
      });

      console.log("Default SuperAdmin initialized");
    } else {
      console.log("SuperAdmin already exists in the database.");
    }
  } catch (error) {
    console.error("Error initializing SuperAdmin:", error.message);
  }
};

module.exports = initializeSuperAdmin;
