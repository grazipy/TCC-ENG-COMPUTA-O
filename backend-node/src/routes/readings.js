const express = require('express');
const pool = require('../db/pool');
const { getDeviceStatus } = require('../services/statusService');

const router = express.Router();

function isNumber(value) {
  return typeof value === 'number' && Number.isFinite(value);
}

router.post('/readings', async (req, res) => {
  const { device_id, temperature, humidity, current, created_at } = req.body;

  if (!device_id || !isNumber(temperature) || !isNumber(humidity) || !isNumber(current)) {
    return res.status(400).json({
      error: 'Campos obrigatórios: device_id, temperature, humidity, current'
    });
  }

  const createdAt = created_at ? new Date(created_at) : new Date();
  if (Number.isNaN(createdAt.getTime())) {
    return res.status(400).json({ error: 'created_at inválido.' });
  }

  try {
    const result = await pool.query(
      `INSERT INTO readings (device_id, temperature, humidity, current, created_at)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING device_id, temperature, humidity, current, created_at`,
      [device_id, temperature, humidity, current, createdAt.toISOString()]
    );

    return res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Erro ao inserir leitura:', error);
    return res.status(500).json({ error: 'Erro interno ao salvar leitura.' });
  }
});

router.get('/devices/:id/readings', async (req, res) => {
  const { id } = req.params;
  const limit = Math.min(Number(req.query.limit) || 100, 1000);

  try {
    const result = await pool.query(
      `SELECT device_id, temperature, humidity, current, created_at
       FROM readings
       WHERE device_id = $1
       ORDER BY created_at DESC
       LIMIT $2`,
      [id, limit]
    );

    return res.json({ device_id: id, readings: result.rows });
  } catch (error) {
    console.error('Erro ao buscar leituras:', error);
    return res.status(500).json({ error: 'Erro interno ao buscar leituras.' });
  }
});

router.get('/devices/:id/status', async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query(
      `SELECT device_id, temperature, humidity, current, created_at
       FROM readings
       WHERE device_id = $1
       ORDER BY created_at DESC
       LIMIT 1`,
      [id]
    );

    const status = getDeviceStatus(result.rows);
    return res.json({ device_id: id, ...status });
  } catch (error) {
    console.error('Erro ao calcular status:', error);
    return res.status(500).json({ error: 'Erro interno ao calcular status.' });
  }
});

module.exports = router;
