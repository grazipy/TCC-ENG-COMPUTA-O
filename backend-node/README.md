# Backend Node.js (Express + PostgreSQL)

API para receber e consultar leituras IoT.

## Requisitos implementados
- `POST /readings`
- `GET /devices/:id/readings`
- `GET /devices/:id/status`
- Persistência em PostgreSQL com campos:
  - `device_id`
  - `temperature`
  - `humidity`
  - `current`
  - `created_at`
- Cálculo de status por limite: `normal`, `atenção`, `crítico`

## Configuração
1. Copie `.env.example` para `.env` e ajuste valores.
2. Instale dependências:
   ```bash
   npm install
   ```
3. Rode a API:
   ```bash
   npm start
   ```

A tabela `readings` é criada automaticamente ao iniciar (`src/db/init.js`).
