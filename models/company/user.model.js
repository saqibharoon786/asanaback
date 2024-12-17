const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { type: String },
    userId: { type: String },
    email: { type: String, required: true, unique: true },
    password: { type: String },
    contact: { type: String },
    address: { type: String },
    image: {  filePath: { type: String}},
    department: {
        type: String,
        enum: ["Admin", "HR", "Sales","IT","Web Development"],
    },
    deleted: { type: Boolean, default: false }  // Status field for soft delete
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
