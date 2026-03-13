const { statusThresholds } = require('../config/env');

function readingLevel(reading) {
  const { attention, critical } = statusThresholds;

  const isCritical =
    reading.temperature >= critical.temperature ||
    reading.humidity >= critical.humidity ||
    reading.current >= critical.current;

  if (isCritical) return 'crítico';

  const isAttention =
    reading.temperature >= attention.temperature ||
    reading.humidity >= attention.humidity ||
    reading.current >= attention.current;

  if (isAttention) return 'atenção';
  return 'normal';
}

function getDeviceStatus(readings) {
  if (!readings.length) {
    return {
      status: 'normal',
      reason: 'Sem leituras ainda.'
    };
  }

  const latest = readings[0];
  const level = readingLevel(latest);

  return {
    status: level,
    last_reading: latest
  };
}

module.exports = { readingLevel, getDeviceStatus };
