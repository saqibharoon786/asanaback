const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    companyId: { type: String },
    name: { type: String },
    userId: { type: String },
    email: { type: String, required: true, unique: true },
    password: { type: String },
    contact: { type: String },
    address: { type: String },
    image: { filePath: { type: String } },
    access: {
      type: String,
      enum: [
        "SuperAdmin",
        "Admin",
        "Sales",
        "HR",
        "Marketing",
        "Web-Dev",
        "SEO",
      ],
    },
    permissions: {
      invoice: { type: [String], default: [] },
      lead: { type: [String], default: [] },
      quote: { type: [String], default: [] },
      product: { type: [String], default: [] },
      department: { type: [String], default: [] },
      company: { type: [String], default: [] },
      event: { type: [String], default: [] },
      customer: { type: [String], default: [] },
    },
    deleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
