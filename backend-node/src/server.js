const app = require('./app');
const { port } = require('./config/env');
const { initDb } = require('./db/init');

async function start() {
  try {
    await initDb();
    app.listen(port, () => {
      console.log(`API rodando na porta ${port}`);
    });
  } catch (error) {
    console.error('Falha ao iniciar API:', error);
    process.exit(1);
  }
}

start();
