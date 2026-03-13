const { statusThresholds, buswayMetrics } = require('../config/env');

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

function evaluateBuswayOverload(currentA) {
  const { nominalCurrentA, loadBandsPct, references } = buswayMetrics;

  const loadPct = nominalCurrentA > 0 ? (currentA / nominalCurrentA) * 100 : 0;

  let level = 'normal';
  let recommendation = 'Operação dentro da faixa recomendada.';

  if (loadPct > loadBandsPct.overloadMax) {
    level = 'sobrecarga_crítica';
    recommendation = 'Reduzir carga imediatamente e inspecionar o barramento.';
  } else if (loadPct > loadBandsPct.attentionMax) {
    level = 'sobrecarga';
    recommendation = 'Programar intervenção de curto prazo e balanceamento de carga.';
  } else if (loadPct > loadBandsPct.normalMax) {
    level = 'atenção';
    recommendation = 'Acompanhar tendência térmica e revisar distribuição de carga.';
  }

  return {
    nominal_current_a: nominalCurrentA,
    measured_current_a: currentA,
    load_pct: Number(loadPct.toFixed(2)),
    load_level: level,
    recommendation,
    technical_reference: references.framework,
    technical_note: references.note
  };
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
  const overloadMetrics = evaluateBuswayOverload(latest.current);

  return {
    status: level,
    busway_overload_metrics: overloadMetrics,
    last_reading: latest
  };
}

module.exports = { readingLevel, evaluateBuswayOverload, getDeviceStatus };
