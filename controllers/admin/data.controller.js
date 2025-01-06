const fs = require("fs");
const path = require("path");
const xlsx = require("xlsx");
const pdfParse = require("pdf-parse");
const companyModel = require("../../models/company/companyIndex.model");

const uploadProductsFile = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No file uploaded.",
      });
    }

    const filePath = req.file.path;
    const fileExtension = path.extname(req.file.filename).toLowerCase();

    let extractedData = [];

    if (fileExtension === ".xlsx" || fileExtension === ".xls") {
      const workbook = xlsx.readFile(filePath);
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      extractedData = xlsx.utils.sheet_to_json(worksheet);
    } else if (fileExtension === ".pdf") {
      const pdfBuffer = fs.readFileSync(filePath);
      const pdfData = await pdfParse(pdfBuffer);
      extractedData = parsePDFData(pdfData.text); // Implement `parsePDFData` to handle your specific PDF format
    } else {
      return res.status(400).json({
        success: false,
        message: "Unsupported file type.",
      });
    }

    const products = extractedData.map((product) => ({
      product_Name: product.product_Name,
      product_CostPrice: product.product_CostPrice,
      product_SellingPrice: product.product_SellingPrice,
      product_StockQuantity: product.product_StockQuantity,
      product_Category: product.product_Category,
      product_Description: product.product_Description,
      product_DateOfPurchase: product.product_DateOfPurchase,
      product_DamagedPieces: product.product_DamagedPieces || 0,
      product_StockLocation: product.product_StockLocation,
      product_Image: {
        filePath: "",
      },
      product_Vendor: {
        vendor_Name: product.vendor_Name,
        vendor_Email: product.vendor_Email,
        vendor_Address: product.vendor_Address,
        vendor_Contact: product.vendor_Contact,
      },
      deleted: false,
    }));
    

    await companyModel.Product.insertMany(products);

    return res.status(201).json({
      success: true,
      message: "Products uploaded and saved successfully.",
      information: {
        products,
      },
    });
  } catch (error) {
    console.error("Error uploading products file:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
};

const parsePDFData = (pdfText) => {
  const lines = pdfText.split("\n");
  const products = [];

  lines.forEach((line) => {
    const parts = line.split(",");
    if (parts.length >= 6) {
      products.push({
        product_Name: parts[0],
        product_CostPrice: parseFloat(parts[1]),
        product_SellingPrice: parseFloat(parts[2]),
        product_StockQuantity: parseInt(parts[3], 10),
        product_Category: parts[4],
        product_Description: parts[5],
      });
    }
  });

  return products;
};

module.exports = { uploadProductsFile };
