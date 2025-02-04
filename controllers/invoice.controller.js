const companyModel = require("../models/company/companyIndex.model");
const utils = require("../utils/utilsIndex");



 const createInvoice = async (req, res) => {

  const companyId = req.user.companyId;

  try {
    const user = req.user;
    const {
      invoice_Customer,
      invoice_SalesPerson,
      invoice_Products,
      invoice_Details,
      invoice_InitialPayment,
      invoice_BeforeTaxPrice,
      invoice_TotalTax,
      invoice_AfterDiscountPrice,
      invoice_Subject,
      invoice_Project,
      invoice_QuoteId,
      invoice_Date,
      invoice_DueDate,
      invoice_ReferenceNumber,
    } = req.body;
  
    const parsedInvoiceProducts = JSON.parse(invoice_Products);
        // Generate unique invoice identifier
    const invoice_Identifier = await utils.generateUniqueInvoiceId();

    const newInvoiceDetails = {
      dateCreated: new Date(),
      status: invoice_Details?.status || "Unpaid",
    };

    var invoice_ImagePath = "";
    if (req.file) {
      invoice_ImagePath = `/uploads/invoices/${req.file.filename}`;
    }

    // Save invoice
    const newInvoice = await companyModel.Invoice.create({
      companyId,
      invoice_Customer,
      invoice_SalesPerson,
      invoice_Identifier,
      invoice_Subject,
      invoice_Project,
      invoice_Creater: user.userId,
      invoice_Products: parsedInvoiceProducts,
      invoice_BeforeTaxPrice,
      invoice_TotalTax,
      invoice_ReferenceNumber,
      invoice_AfterDiscountPrice,
      invoice_InitialPayment,
      invoice_Details: newInvoiceDetails,
      invoice_QuoteId: invoice_QuoteId || "",
      invoice_Date,
      invoice_DueDate,
      invoice_Image: {
        filePath: invoice_ImagePath,
      },
    });

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
