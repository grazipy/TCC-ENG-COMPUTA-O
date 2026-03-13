const pool = require('./pool');

async function initDb() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS readings (
      id BIGSERIAL PRIMARY KEY,
      device_id TEXT NOT NULL,
      temperature DOUBLE PRECISION NOT NULL,
      humidity DOUBLE PRECISION NOT NULL,
      current DOUBLE PRECISION NOT NULL,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
  `);

  await pool.query('CREATE INDEX IF NOT EXISTS idx_readings_device_created_at ON readings (device_id, created_at DESC);');
}

module.exports = { initDb };
