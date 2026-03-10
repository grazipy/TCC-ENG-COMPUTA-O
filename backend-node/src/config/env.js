const dotenv = require('dotenv');

dotenv.config();

function num(name, fallback) {
  const raw = process.env[name];
  if (!raw) return fallback;
  const parsed = Number(raw);
  return Number.isFinite(parsed) ? parsed : fallback;
}

module.exports = {
  port: num('PORT', 3000),
  databaseUrl: process.env.DATABASE_URL,
  statusThresholds: {
    attention: {
      temperature: num('STATUS_ATTENTION_TEMP', 70),
      humidity: num('STATUS_ATTENTION_HUMIDITY', 70),
      current: num('STATUS_ATTENTION_CURRENT', 100)
    },
    critical: {
      temperature: num('STATUS_CRITICAL_TEMP', 85),
      humidity: num('STATUS_CRITICAL_HUMIDITY', 85),
      current: num('STATUS_CRITICAL_CURRENT', 140)
    }
  }
};
