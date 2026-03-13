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
  },
  buswayMetrics: {
    nominalCurrentA: num('BUSWAY_NOMINAL_CURRENT_A', 100),
    loadBandsPct: {
      normalMax: num('BUSWAY_LOAD_NORMAL_MAX_PCT', 80),
      attentionMax: num('BUSWAY_LOAD_ATTENTION_MAX_PCT', 100),
      overloadMax: num('BUSWAY_LOAD_OVERLOAD_MAX_PCT', 120)
    },
    references: {
      framework: process.env.BUSWAY_TECHNICAL_REFERENCES || 'IEC 61439 (painéis/conjuntos BT) e NBR IEC 61439 como referência de engenharia',
      note: process.env.BUSWAY_TECHNICAL_NOTE || 'Métrica operacional para manutenção preditiva; validar com projeto elétrico, fabricante e responsável técnico.'
    }
  }
};
