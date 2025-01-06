require('dotenv').config();
const express = require("express");
const connectDB = require("./config/db");
const indexRouter = require("./routes/index.route");
const cors = require("cors");
const path = require("path");
const dataExtraction = require("./routes/admin/dataExtraction.route");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const PORT = process.env.PORT || 3000;

// Connect to the database
connectDB();

// Serve static files (uploads folder)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Use routes
app.use("/", indexRouter);
// app.use('/data-extraction',dataExtraction)
// Start the server
app.listen(3000, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
