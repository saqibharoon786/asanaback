require('dotenv').config();
const express = require("express");
const connectDB = require("./config/db");
const indexRouter = require("./routes/index.route");
const cors = require("cors");
const path = require("path");

// New imports for Socket.IO
const http = require("http");
const socketIo = require("socket.io");

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

// Create an HTTP server using your Express app.
const server = http.createServer(app);

// Initialize Socket.IO on the HTTP server with basic CORS settings.
const io = socketIo(server, {
  cors: {
    origin: "*", // Adjust this for production!
  },
});

// Attach the Socket.IO instance to the Express app so it can be used in controllers.
app.set("socketio", io);

// Listen for client connections and handle basic events.
io.on("connection", (socket) => {
  console.log(`New client connected: ${socket.id}`);

  // Allow clients to join a room (for individual or team notifications)
  socket.on("joinRoom", (roomId) => {
    socket.join(roomId);
    console.log(`Socket ${socket.id} joined room: ${roomId}`);
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);
  });
});

// Start the server using the HTTP server instead of app.listen().
server.listen(PORT, HOST, () => {
  console.log(`Server is running on http://${HOST}:${PORT}`);
});
