const companyModel = require("../../models/company/companyIndex.model");

// Create an Invoice
const createInvoice = async (req, res) => {
  try {
    const user = req.user;
    const name = req.user.name;
    let invoice_TotalPrice = 0;

    const tax = 0.05;
    

    let product_Tax = 0;
    let product_TaxAmount = 0;
    let product_DiscountedAmount = 0;

    const { invoice_Creater, invoice_Client, invoice_Products, invoice_Details } = req.body;

    // Validation: Check if creator, client, and products are provided
    if (!invoice_Creater || !invoice_Client || !invoice_Products || invoice_Products.length === 0) {
      return res.status(400).json({
        success: false,
        status: 400,
        message: "Creator details, client details, and at least one product are required.",
      });
    }

    // Loop through each product in the invoice_Products array
    for (let item of invoice_Products) {
      product_DiscountedAmount = 0;
      product_TaxAmount = 0;

      const { product, quantity, product_Price, product_Discount } = item;

      // Find product in the database
      const dbProduct = await companyModel.Product.findOne({
        product_Name: product,
      });

      if (!dbProduct) {
        return res.status(404).json({
          success: false,
          status: 404,
          message: `Product '${product}' not found in the database.`,
        });
      }

      if (dbProduct.product_StockQuantity < quantity) {
        return res.status(400).json({
          success: false,
          status: 400,
          message: `Not enough quantity for product '${product}'. Available: ${dbProduct.product_StockQuantity}, Requested: ${quantity}.`,
        });
      }
    dbProduct.product_StockQuantity -=quantity;
    await dbProduct.save();

      product_Tax = product_Price * quantity * tax;
      item.product_Tax = product_Tax;

      let totalProductPrice = (product_Price * quantity) + product_Tax;
      product_DiscountedAmount = totalProductPrice * (product_Discount / 100);
      const discountedProductPrice = totalProductPrice - product_DiscountedAmount;

      item.product_Discount = product_Discount;
      item.product_FinalAmount = discountedProductPrice;

      invoice_TotalPrice += item.product_FinalAmount;

    }

    // Prepare invoice details
    const newInvoiceDetails = {
      dateCreated: new Date(),
      status: invoice_Details?.status || "Pending",
    };

    // Save the invoice to the database
    const newInvoice = await companyModel.Invoice.create({
      invoice_Creater,
      invoice_Client,
      invoice_Products,
      invoice_TotalPrice,
      invoice_Details: newInvoiceDetails,
    });
    

    let invoice_Identifier;

    if (name) {
      const namePart = name.substring(0, 2).toUpperCase();
      const idPart = newInvoice._id.toString().slice(-4);
      invoice_Identifier = `${namePart}-${idPart}`;
    } else {
      invoice_Identifier = newInvoice._id.toString();
    }

    // Attach the identifier to the document
    newInvoice.invoice_Identifier = invoice_Identifier;
    await newInvoice.save();

    return res.status(200).json({
      success: true,
      status: 200,
      message: "Invoice created successfully",
      information: {
        newInvoice,
      },
    });
  } catch (error) {
    console.error("Error creating invoice:", error);
    return res.status(500).json({
      success: false,
      status: 500,
      message: error.message,
    });
  }
};


const getAllInvoice = async (req, res) => {
  try {
    // Fetch all Invoice
    var Invoice = await companyModel.Invoice.find();

    if (!Invoice || Invoice.length === 0) {
      return res.status(200).json({
        success: true,
        status: 200,
        message: "No Invoice found",
        information: {
          Invoice: [],
        },
      });
    }

    return res.status(200).json({
      success: true,
      status: 200,
      message: "Invoice retrieved successfully",
      information: {
        Invoice,
      },
    });
  } catch (error) {
    console.error("Error fetching Invoice:", error);
    return res.status(500).json({
      success: false,
      status: 500,
      message: error.message,
    });
  }
};

const getInvoiceById = async (req, res) => {
  try {
    var { invoiceId } = req.params;

    // Fetch the invoice by ID using findById
    var invoice = await companyModel.Invoice.findById(invoiceId);

    // If no invoice is found, return a message with an empty array
    if (!invoice) {
      return res.status(200).json({
        success: true,
        status: 404,
        message: "No Invoice found",
        information: {
          invoice: [],
        },
      });
    }

    // If invoice is found, return it in the response
    return res.status(200).json({
      success: true,
      status: 200,
      message: "Invoice retrieved successfully",
      information: {
        invoice, 
      },
    });
  } catch (error) {
    console.error("Error fetching Invoice:", error);
    return res.status(500).json({
      success: false,
      status: 500,
      message: error.message,
    });
  }
};


const getInvoiceByEmail = async (req, res) => {
  try {
    const user = req.user;
    const email = user.email;

    // Fetch the invoice by ID using findById
    var invoices = await companyModel.Invoice.find({"invoice_Creater.email" : email});

    // If no invoice is found, return a message with an empty array
    if (!invoices) {
      return res.status(200).json({
        success: true,
        status: 404,
        message: "No Invoices found",
        information: {
          invoice: [],
        },
      });
    }

    // If invoice is found, return it in the response
    return res.status(200).json({
      success: true,
      status: 200,
      message: "invoice retrieved successfully",
      information: {
        invoices, // Wrap in an array to maintain consistency
      },
    });
  } catch (error) {
    console.error("Error fetching Invoices:", error);
    return res.status(500).json({
      success: false,
      status: 500,
      message: error.message,
    });
  }
};


const invoice = {
  createInvoice,
  getAllInvoice,
  getInvoiceById,
  getInvoiceByEmail
}

module.exports = invoice;
