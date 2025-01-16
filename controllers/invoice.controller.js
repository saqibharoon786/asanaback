const companyModel = require("../models/company/companyIndex.model");

// Create an Invoice
const createInvoice = async (req, res) => {
  const companyId = req.user.companyId;
  try {
    const user = req.user;
    const {
      invoice_Client,
      invoice_Products,
      invoice_Details,
      invoice_InitialPayment,
      invoice_BeforeTaxPrice,
      invoice_AfterTaxPrice,
      invoice_AfterDiscountPrice,
    } = req.body;

    // Verify product existence and stock
    for (const item of invoice_Products) {
      const { product, quantity, product_AfterDiscountPrice } = item;

      const dbProduct = await companyModel.Product.findOne({
        product_Name: product,
        companyId,
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
          message: `Insufficient stock for product '${product}'.`,
        });
      }
    }

    // Generate unique invoice identifier
    const invoiceCount = await companyModel.Invoice.countDocuments();
    const invoice_Identifier = `${user.userId}-${invoiceCount + 1}`;

    const newInvoiceDetails = {
      dateCreated: new Date(),
      status: invoice_Details?.status || "Unpaid",
    };

    // Save invoice
    const newInvoice = await companyModel.Invoice.create({
      companyId,
      invoice_Identifier,
      invoice_Creater: {
        name: user.name,
        email: user.email,
        contact: user.contact,
      },
      invoice_Client,
      invoice_Products, // Pass products directly, including discount fields
      invoice_BeforeTaxPrice,
      invoice_AfterTaxPrice,
      invoice_AfterDiscountPrice,
      invoice_InitialPayment,
      invoice_Details: newInvoiceDetails,
    });

    // Update stock quantities
    for (const item of invoice_Products) {
      const product = await companyModel.Product.findOne({
        companyId,
        product_Name: item.product,
        deleted: false,
      });

      if (product) {
        product.product_StockQuantity -= item.quantity;
        await product.save();
      }
    }

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
    const companyId = req.user.companyId;
    var Invoices = await companyModel.Invoice.find({ companyId: companyId, deleted: false });

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
    const companyId = req.user.companyId;
    const { invoiceId } = req.params;

    const invoice = await companyModel.Invoice.findOne({
      _id: invoiceId,
      companyId,
    });

    if (!invoice) {
      return res.status(404).json({
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
    const companyId = req.user.companyId;
    const { invoiceId } = req.params;

    const invoice = await companyModel.Invoice.findOne({
      _id: invoiceId,
      companyId,
    });

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

    // Update the invoice status to "Paid"
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

const deleteInvoice = async (req, res) => {
  try {
    const companyId = req.user.companyId;
    const { invoiceId } =  req.params;

    if (!invoiceId) {
      return res.status(400).json({
        success: false,
        message: "Please provide the invoice ID."
      });
    }

    // Find the invoice by ID and mark it as deleted
    const invoice = await companyModel.Invoice.findById({
      companyId,      
    _id: invoiceId,
    });
    if (!invoice) {
      return res.status(404).json({
        success: false,
        message: "Invoice not found."
      });
    }

    // Mark the invoice as deleted by updating the 'deleted' field to true
    await companyModel.Invoice.updateOne(
      { _id: invoiceId },
      { $set: { deleted: true } }
    );

    return res.status(200).json({
      success: true,
      message: "Invoice deleted successfully."
    });
  } catch (error) {
    console.error("Error deleting invoice:", error);
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

const invoice = {
  createInvoice,
  getAllInvoices,
  getInvoiceById,
  setPaidInvoicebyId,
  deleteInvoice,
}

module.exports = invoice;
