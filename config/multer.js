const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Define folder paths
const employeeFolder = path.join(__dirname, "../uploads/employee");
const productFolder = path.join(__dirname, "../uploads/product");
const companyFolder = path.join(__dirname, "../uploads/company");
const adminFolder = path.join(__dirname, "../uploads/admin");
const filesFolder = path.join(__dirname, "../uploads/files");
const quotesFolder = path.join(__dirname, "../uploads/quotes"); 
const invoicesFolder = path.join(__dirname, "../uploads/invoices"); 

const randomNumber = Math.floor(Math.random() * 10000);

// Create folders if they don't exist
const ensureFolderExists = (folderPath) => {
  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath, { recursive: true });
  }
};

ensureFolderExists(employeeFolder);
ensureFolderExists(productFolder);
ensureFolderExists(companyFolder);
ensureFolderExists(adminFolder);
ensureFolderExists(filesFolder);
ensureFolderExists(quotesFolder);
ensureFolderExists(invoicesFolder);

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Decide folder based on file fieldname or mimetype
    if (file.fieldname === "employee_Image") {
      cb(null, employeeFolder);
    } else if (file.fieldname === "product_Image") {
      cb(null, productFolder);
    } else if (file.fieldname === "company_Image") {
      cb(null, companyFolder);
    } else if (file.fieldname === "admin_Image") {
      cb(null, adminFolder);
    } else if (file.fieldname === "quote_Image") {
      cb(null, quotesFolder);
    } 
    else if (file.fieldname === "invoice_Image") {
      cb(null, invoicesFolder);
    }
    
    else if (
      file.mimetype === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" || // Excel
      file.mimetype === "application/vnd.ms-excel" || // Excel
      file.mimetype === "application/pdf" // PDF
    ) {
      cb(null, filesFolder);
    } else {
      cb(new Error("Invalid file type or field name"), null);
    }
  },
  filename: (req, file, cb) => {
    // Generate a unique filename
    cb(null, `${Date.now()}_${randomNumber}_${file.originalname}`);
  },
});

const fileFilter = (req, file, cb) => {
  // Define allowed file types
  const allowedTypes = [
    "image/jpeg",
    "image/png",
    "image/gif",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    "application/vnd.ms-excel",
    "application/pdf",
  ];

  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Unsupported file type. Allowed types are images, Excel, and PDF."), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 10 * 1024 * 1024 }, 
});

module.exports = upload;
