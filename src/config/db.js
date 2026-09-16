require('dotenv').config();
const { Pool } = require('pg');

// 1. Create a new pool using environment variables
const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
});

// 2. Test database connection
pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('Connection failed:', err.message);
  } else {
    console.log('Connected! Server time:', res.rows[0].now);
  }
});

// 3. Export the pool so other files can run queries
module.exports = pool;