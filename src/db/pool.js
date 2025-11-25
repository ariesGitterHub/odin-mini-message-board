// POOL MANAGES YOUR CONNECTIONS

require("dotenv").config();

const { Pool } = require("pg");

const pool = new Pool({
  host: process.env.PG_HOST,
  user: process.env.PG_USER,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: Number(process.env.PG_PORT),

  max: 10, // max clients in pool
  idleTimeoutMillis: 30000, // close idle clients after 30 seconds
  connectionTimeoutMillis: 5000,

  // SSL only in production (Render/Heroku/Railway require this)
  ssl: process.env.NODE_ENV === "production" 
    ? { rejectUnauthorized: false }
    : false,
});

// Optional: helpful for debugging
pool.on("connect", () => {
  console.log("PostgreSQL pool connected");
});

module.exports = pool;


