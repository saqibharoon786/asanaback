const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema({
  companyId: {
    type: String,
  },
  //General Details
  customer_GeneralDetails: {  
    customer_Type: {
      type: String,
      enum: ["business", "individual"],
    },
    customer_PrimaryInfo: {
      salutation: { type: String },
      firstName: { type: String },
      lastName: { type: String },
    },
    customer_CompanyName: {
      type: String,
    },
    customer_DisplayName: {
      type: String,
    },
    customer_Email: {
      type: String,
    },
    customer_Contact: {
      workPhone: { type: String },
      mobilePhone: { type: String },
    },
  },
  // Other Details
  customer_OtherDetails: {
    customer_TRN: {
      type: String,
    },    
    customer_CompanyId: {
      type: String,
    }, 
    customer_Currency: {
      type: String,
    },
    customer_PaymentTerms: {
      type: String,
    },
    customer_EnablePortal: {
      type: Boolean,
      default: false,
    },
    customer_OpeningBalance: {
      type: Number,
    },
    customer_TaxRate: {
      type: Number,
    },
    customer_PortalLanguage: {
      type: String,
    },
    customer_Documents: [
      {
        filePath: { type: String },
      },
    ],
  },
  // Address
  customer_Address: {
    billingAddress: { 
      billingAddress_Attention: { type: String },
      billingAddress_Country: { type: String },
      billingAddress_State: { type: String },
      billingAddress_Address: { type: String },
      billingAddress_City: { type: String },
      billingAddress_ZipCode: { type: String },
      billingAddress_Phone: { type: String },
      billingAddress_FaxNo: { type: String },
    },
    shippingAddress: {
      shippingAddress_Attention: { type: String },
      shippingAddress_Country: { type: String },
      shippingAddress_State: { type: String },
      shippingAddress_Address: { type: String },
      shippingAddress_City: { type: String },
      shippingAddress_ZipCode: { type: String },
      shippingAddress_Phone: { type: String },
      shippingAddress_FaxNo: { type: String },
    },
  },
  customer_ContactPersons: [
    {
      salutation: { type: String },
      firstName: { type: String },
      lastName: { type: String },
      email: { type: String },
      phone: { type: String },
      designation: { type: String },
    },
  ],
  customer_Remarks: {
    type: String,
  },
  customer_CreatedBy: {
    userId: { type: String },
  },
  deleted: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
  },
});

const Customer = mongoose.model("Customer", customerSchema);

module.exports = Customer;
