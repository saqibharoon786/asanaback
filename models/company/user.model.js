const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { type: String },
    userId: { type: String },
    email: { type: String, required: true, unique: true },
    password: { type: String },
    contact: { type: String },
    address: { type: String },
    image: { filePath: { type: String } },
    access: {
      type: String,
      enum: ["SuperAdmin", "Admin"],
    },
    department: {
      type: String,
      enum: [ "HR", "Sales", "IT", "Web Development"],
    },
    companyId: { type: String },
    deleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
