# Backend Node.js (Express + PostgreSQL)

API para receber e consultar leituras IoT.

## Requisitos implementados
- `POST /readings`
- `GET /devices/:id/readings`
- `GET /devices/:id/status`
- `GET /devices/:id/busway-metrics`
- Persistência em PostgreSQL com campos:
  - `device_id`
  - `temperature`
  - `humidity`
  - `current`
  - `created_at`
- Cálculo de status por limite: `normal`, `atenção`, `crítico`
- Métricas de sobrecarga de busway por corrente nominal (% de carga)

## Métricas de sobrecarga de busway
A API calcula `busway_overload_metrics` a partir da corrente medida e da corrente nominal configurada:

- `load_pct = (current / nominal_current) * 100`
- Faixas padrão:
  - `<= 80%`: normal
  - `> 80% e <= 100%`: atenção
  - `> 100% e <= 120%`: sobrecarga
  - `> 120%`: sobrecarga crítica

> Referência técnica usada como base de engenharia: IEC 61439 / NBR IEC 61439.
> **Importante:** a configuração final deve ser validada com projeto elétrico, fabricante do barramento e responsável técnico.

## Estrutura
- `src/modules/`: estrutura alvo por domínio (auth, devices, ingestion, telemetry, alerts, notifications, users).
- `src/common/`: middleware, utils, types e constantes compartilhadas.
- `src/config/`, `src/database/`: configuração e camada de dados.
- `src/app.js` e `src/server.js`: runtime atual do MVP.
- `src/app.ts`: placeholder para migração futura para TypeScript.

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
