require('dotenv').config();
const pool = require('./src/config/db');

async function initializeDatabase() {
  try {
    console.log('--- Initializing Database Tables ---');

    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(255) UNIQUE NOT NULL,
        password_hash VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log('✔ Users table created or already exists.');

    await pool.query(`
      CREATE TABLE IF NOT EXISTS students (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        course VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log('✔ Students table created or already exists.');

    console.log('Database initialization complete!');
    process.exit(0);
  } catch (error) {
    console.error('Failed to initialize database:', error.message);
    process.exit(1);
  }
}

initializeDatabase();
