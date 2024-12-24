// middleware/upload.js
const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Ensure the folders exist
const employeeFolder = path.join(__dirname, "../uploads/employee");
const productFolder = path.join(__dirname, "../uploads/product");

const randomNumber = Math.floor(Math.random() * 10000);

// Create folders if they don't exist
if (!fs.existsSync(employeeFolder))
  fs.mkdirSync(employeeFolder, { recursive: true });
if (!fs.existsSync(productFolder))
  fs.mkdirSync(productFolder, { recursive: true });

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.fieldname === "employee_Image") {
      cb(null, employeeFolder);
    } else if (file.fieldname === "product_Image") {
      cb(null, productFolder); // Ensure this matches the field name used in the form
    } else {
      cb(new Error("Invalid field name"), null);
    }
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${randomNumber}_${file.originalname}`);
  },
});

const upload = multer({ storage });

module.exports = upload;
