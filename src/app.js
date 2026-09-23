require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');

// Initialize Database Connection Pool
require('./config/db');

// Import Swagger Setup
const setupSwagger = require('./config/swagger');

// Import Route Modules
const studentRoutes = require('./routes/student.routes');
const authRoutes = require('./routes/auth.routes');

const app = express();

// Global Middlewares
app.use(express.json());
app.use(cookieParser());

// Setup Swagger API Documentation UI at /api-docs
setupSwagger(app);

// Register API Routes
app.use('/students', studentRoutes);
app.use('/auth', authRoutes);

// Export Express app module
module.exports = app;