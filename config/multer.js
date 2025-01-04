// middleware/upload.js
const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Ensure the folders exist
const employeeFolder = path.join(__dirname, "../uploads/employee");
const productFolder = path.join(__dirname, "../uploads/product");
const companyFolder = path.join(__dirname, "../uploads/company");
const adminFolder = path.join(__dirname, "../uploads/admin");

const randomNumber = Math.floor(Math.random() * 10000);

// Create folders if they don't exist
if (!fs.existsSync(employeeFolder))
  fs.mkdirSync(employeeFolder, { recursive: true });
if (!fs.existsSync(productFolder))
  fs.mkdirSync(productFolder, { recursive: true });
if (!fs.existsSync(companyFolder))
  fs.mkdirSync(companyFolder, { recursive: true });
if (!fs.existsSync(adminFolder))
  fs.mkdirSync(adminFolder, { recursive: true });
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.fieldname === "employee_Image") {
      cb(null, employeeFolder);
    } else if (file.fieldname === "product_Image") {
      cb(null, productFolder);
    } else if (file.fieldname === "company_Image") {
      cb(null, companyFolder);
    }
    else if (file.fieldname === "admin_Image") {
      cb(null, adminFolder);
    } 
    else {
      cb(new Error("Invalid field name"), null);
    }
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${randomNumber}_${file.originalname}`);
  },
});

const upload = multer({ storage });

module.exports = upload;
