const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { type: String },
    email: { type: String, required: true, unique: true },
    password: { type: String },
    image: { type: Object },
    contact: { type: String },
    address: { type: String },
    admin: { type: Boolean, default: false },
    deleted: { type: Boolean, default: false }  // Status field for soft delete
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
