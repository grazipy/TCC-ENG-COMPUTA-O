const express = require('express');
const readingsRouter = require('./routes/readings');

const app = express();

app.use(express.json());
app.use(readingsRouter);

app.get('/health', (_, res) => {
  res.json({ status: 'ok' });
});

module.exports = app;
