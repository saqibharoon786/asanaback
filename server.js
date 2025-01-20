require('dotenv').config();
const express = require("express");
const connectDB = require("./config/db");
const indexRouter = require("./routes/index.route");
const cors = require("cors");
const path = require("path");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const HOST = process.env.HOST;
const PORT = process.env.PORT;

// Connect to the database
connectDB();

// Serve static files (uploads folder)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Use routes
app.use("/", indexRouter);

// Start the server
app.listen(PORT, HOST, () => {
  console.log(`Server is running on http://${HOST}:${PORT} `);
});
