// app.js (or server.js)
const express = require("express");
const connectDB = require("./config/db");
var indexRouter = require("./routes/index.route");
var cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Connect to the database
connectDB();

app.use("/", indexRouter);

app.listen(3000, () => {
  console.log(`Server is running on http://localhost:${3000}`);
});
