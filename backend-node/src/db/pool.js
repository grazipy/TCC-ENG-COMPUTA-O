const { Pool } = require('pg');
const { databaseUrl } = require('../config/env');

if (!databaseUrl) {
  throw new Error('DATABASE_URL não configurada. Use .env baseado em .env.example');
}

const pool = new Pool({
  connectionString: databaseUrl
});

module.exports = pool;
