require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");

// Initialize Database Connection Pool
require("./config/db");

const studentRoutes = require("./routes/student.routes");
const authRoutes = require("./routes/auth.routes");

const app = express();

// Middlewares
app.use(express.json());
app.use(cookieParser());

// Register API Routes
app.use("/students", studentRoutes);
app.use("/auth", authRoutes);

// Export Express app (server.js will handle app.listen)
module.exports = app;