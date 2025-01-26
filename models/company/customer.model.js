const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
    companyId: {
        type: String
    },
    //General Details
    customer_GeneralDetails: {
        customer_Type: {
            type: String,
            enum: ['Business', 'Individual'],
        },
        customer_PrimaryInfo: {
            salutation: { type: String },
            firstName: { type: String },
            lastName: { type: String }
        },
        customer_CompanyName: {
            type: String
        },
        customer_DisplayName: {
            type: String
        },
        customer_Email: {
            type: String,
        },
        customer_Contact: {
            workPhone: { type: String },
            mobilePhone: { type: String }
        },
    },
    // Other Details
    customer_OtherDetails : {
        customer_Currency: {
            type: String,
        },
        customer_PaymentTerms: {
            type: String,
            enum: ['Due On Receipt', 'Net 15', 'Net 30', 'Net 45', 'Net 60'],
            default: 'Due On Receipt'
        },
        customer_EnablePortal: {
            type: Boolean,
            default: false
        },
        customer_OpeningBalance: {
            type: Number,
        },
        customer_TaxRate: {
            type: Number, 
        },
        customer_Documents: [
            {
                filePath: { type: String }
            }
        ],  
    },
    // Address
   customer_Address:{
    billingAddress: {
        street: { type: String },
        city: { type: String },
        state: { type: String },
        postalCode: { type: String },
        country: { type: String }
    },
    shippingAddress: {
        street: { type: String },
        city: { type: String },
        state: { type: String },
        postalCode: { type: String },
        country: { type: String }
    },
   },
    customer_ContactPersons: [
        {
            salutation: { type: String },
            firstName: { type: String },
            lastName: { type: String },
            email: { type: String },
            phone: { type: String },
            designation: { type: String }
        }
    ],
    customer_Remarks: {
        type: String
    },
    customer_CreatedBy: {
        userId: { type: String }
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date
    }
});

const Customer = mongoose.model("Customer", customerSchema);

module.exports = Customer;
