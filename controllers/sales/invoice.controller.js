const companyModel = require("../../models/company/companyIndex.model");

// Create an Invoice
const createInvoice = async (req, res) => {
  try {
    const user = req.user;
    var invoice_TotalPrice = 0;
    var tax = 0.05;

    var product_Tax = 0;
    var product_TaxAmount = 0;
    var product_DiscountedAmount = 0;

    // Destructure data from request body
    var { invoice_Client, invoice_Products, invoice_Details } = req.body;

    // Loop through each product in invoice_Products array
    for (var item of invoice_Products) {
      product_DiscountedAmount = 0;
      product_TaxAmount = 0;
      var { product, quantity, product_Price, product_Discount } = item;

      // Find product in the database
      var dbProduct = await companyModel.Product.findOne({
        product_Name: product,
      });

      if (!dbProduct) {
        return res.status(404).json({
          success: false,
          status: 404,
          message: `Product '${product}' not found in the database.`,
        });
      }

      product_Tax = product_Price * quantity * tax;
      item.product_Tax = product_Tax;
      product_Price = (product_Price * quantity) + product_Tax;
      product_DiscountedAmount = product_Price * (product_Discount / 100);
      product_Price = product_Price - product_DiscountedAmount;
      item.product_Discount = product_Discount;
      item.product_FinalAmount = product_Price;

      invoice_TotalPrice += item.product_FinalAmount;
    }

    // Get the total count of invoices created by this user
    var invoiceCount = await companyModel.Invoice.countDocuments();
    var invoice_Identifier = `${user.userId}-${invoiceCount + 1}`;

    // Prepare invoice details
    var newInvoiceDetails = {
      dateCreated: new Date(),
      status: invoice_Details?.status || "Unpaid", // Default to "Pending" if not provided
    };

    // Create a new invoice document
    var newInvoice = await companyModel.Invoice.create({
      invoice_Identifier,
      invoice_Creater: {
        name: user.name,
        email: user.email,
        contact: user.contact,
      },
      invoice_Client,
      invoice_Products,
      invoice_TotalPrice,
      invoice_Details: newInvoiceDetails,
    });

    // Correcting the loop to update product stock quantities
    for (const item of newInvoice.invoice_Products) {
      const product = await companyModel.Product.findOne({ product_Name: item.product, deleted: false});
    
      if (product) {
        product.product_StockQuantity -= item.quantity; // Decrease stock quantity
        await product.save(); // Save the updated product
      }
    }
    
    // Send response with the created invoice
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

const getAllInvoices = async (req, res) => {
  try {
    // Fetch all Invoice
    var Invoices = await companyModel.Invoice.find({ deleted: false });

    if (!Invoices || Invoices.length === 0) {
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
        Invoices,
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

const setPaidInvoicebyId = async (req, res) => {
  try {
    const user = req.user;
    const { invoiceId } = req.params;

    // Fetch the invoice by ID using findById
    var invoice = await companyModel.Invoice.findById(invoiceId);

    // If no invoice is found, return a message with an empty array
    if (!invoice) {
      return res.status(404).json({
        success: false,
        status: 404,
        message: "No Invoice found",
        information: {
          invoice: [],
        },
      });
    }

    invoice.invoice_Details.status = "Paid";
    await invoice.save();

    // Return a success message with the updated invoice
    return res.status(200).json({
      success: true,
      status: 200,
      message: "Invoice paid successfully",
      information: {
        invoice, 
      },
    });
  } catch (error) {
    console.error("Error updating invoice:", error);
    return res.status(500).json({
      success: false,
      status: 500,
      message: error.message,
    });
  }
};


const invoice = {
  createInvoice,
  getAllInvoices,
  getInvoiceById,
  setPaidInvoicebyId
}

module.exports = invoice;
