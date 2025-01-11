const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
    companyId: {
        type: String
    },
    // Customer Type
    customer_Type: {
        type: String,
        enum: ['Business', 'Individual'],
        required: true
    },

    // Primary Contact
    primary_Contact: {
        salutation: { type: String },
        first_Name: { type: String },
        last_Name: { type: String }
    },

    // Company Information
    company_Name: {
        type: String
    },
    display_Name: {
        type: String
    },
    email_Address: {
        type: String,
        lowercase: true
    },
    phone: {
        work_Phone: { type: String },
        mobile_Phone: { type: String }
    },
    
    currency: {
        type: String,
        required: true
    },
    taxRate: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'TaxRate'
    },
    openingBalance: {
        type: Number,
        default: 0
    },
    paymentTerms: {
        type: String,
        enum: ['Due On Receipt', 'Net 15', 'Net 30', 'Net 45', 'Net 60'],
        default: 'Due On Receipt'
    },
    enablePortal: {
        type: Boolean,
        default: false
    },
    portalLanguage: {
        type: String,
        default: 'English'
    },

    // Address Information
    billing_Address: {
        street: { type: String },
        city: { type: String },
        state: { type: String },
        postalCode: { type: String },
        country: { type: String }
    },
    shipping_Address: {
        street: { type: String },
        city: { type: String },
        state: { type: String },
        postalCode: { type: String },
        country: { type: String }
    },

    // Contact Persons
    contact_Persons: [
        {
            name: { type: String },
            email: { type: String },
            phone: { type: String },
            designation: { type: String }
        }
    ],

    // Custom Fields
    custom_Fields: [
        {
            fieldName: { type: String },
            fieldValue: { type: String }
        }
    ],

    // Reporting Tags
    reporting_Tags: [
        {
            tagName: { type: String },
            tagValue: { type: String }
        }
    ],

    remarks: {
        type: String
    },

    documents: [
        {
            filePath: { type: String }
        }
    ],

    // Metadata
    createdBy: {
        type: String
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
