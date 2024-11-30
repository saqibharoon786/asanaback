// config/db.js
const mongoose = require("mongoose");

// Replace with your MongoDB connection string
const dbURI = "mongodb://127.0.0.1:27017/TTechCRM";

const connectDB = async () => {
  try {
    await mongoose.connect(dbURI);
    console.log("Connected to the database");
  } catch (err) {
    console.error("Database connection error:", err);
    process.exit(1); // Exit the process with failure
  }
};

module.exports = connectDB;
